"use server";

// Lib
// -----------------------------------------------------------------------------
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { scryptSync } from "node:crypto";
import fs from "node:fs/promises";

// App
// -----------------------------------------------------------------------------
import prisma from "@/lib/db";
import {
  CreateBlogPostSchema,
  UpdateBlogPostSchema,
  LoginSchema,
  SettingsSchema,
} from "@/lib/schemas";
import { createSession, deleteSession } from "@/lib/session";
import { getUser } from "@/lib/queries";
import {
  saveUploadedFiles,
  logError,
  makeImagePath,
  makeThumbnailPath,
} from "@/lib/utils";

const PASSWORD_SALT = process.env.PASSWORD_SALT;

/** Состояние формы поста */
export type BlogPostFormState = {
  errors?: {
    title?: string[];
    content?: string[];
    isPublished?: string[];
    deleteFiles?: string[];
  };
  message?: string | null;
};

/** Состояние формы настроек */
export type SettingsFormState = {
  errors?: {
    siteName?: string[];
    copyright?: string[];
  };
  message?: string | null;
};

/** Состояние формы логина */
export type LoginFormState = {
  errors?: {
    name?: string[];
    password?: string[];
  };
  message?: string | null;
};

/** Создать пост */
export const createBlogPost = async (
  prevState: BlogPostFormState,
  formData: FormData,
) => {
  const validatedFields = CreateBlogPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    isPublished: formData.get("isPublished"),
    files: formData.getAll("files"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ошибка заполнения формы",
    };
  }

  const { title, content, isPublished, files } = validatedFields.data;

  try {
    const blogPost = await prisma.blogPost.create({
      data: {
        title,
        content,
        isPublished,
      },
    });

    if (files) {
      await saveUploadedFiles(blogPost.id, files);
    }
  } catch (err) {
    logError(err);
    return { message: "Ошибка создания поста" };
  }

  revalidatePath("/admin/posts");
  redirect("/admin/posts");
};

/** Обновить пост */
export const updateBlogPost = async (
  id: number,
  prevState: BlogPostFormState,
  formData: FormData,
) => {
  const validatedFields = UpdateBlogPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    isPublished: formData.get("isPublished"),
    files: formData.getAll("files"),
    deleteFiles: formData.getAll("deleteFiles"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ошибка заполнения формы",
    };
  }

  const { title, content, isPublished, files, deleteFiles } =
    validatedFields.data;

  try {
    const blogPost = await prisma.blogPost.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        isPublished,
      },
    });

    if (files) {
      await saveUploadedFiles(blogPost.id, files);
    }

    if (deleteFiles) {
      for (const fileId of deleteFiles) {
        const deletedFile = await prisma.blogPostImage.delete({
          where: { id: fileId },
        });

        await fs.rm(makeImagePath(deletedFile));
        await fs.rm(makeThumbnailPath(deletedFile));
      }
    }
  } catch (err) {
    logError(err);
    return { message: "Ошибка обновления поста" };
  }

  revalidatePath("/admin/posts");
  redirect("/admin/posts");
};

/** Удалить пост */
export const deleteBlogPost = async (id: number) => {
  try {
    await prisma.blogPost.delete({ where: { id } });
  } catch (err) {
    logError(err);
    return { message: "Ошибка удаления поста" };
  }

  revalidatePath("/admin/posts");
  redirect("/admin/posts");
};

/** Обновить настройки */
export const updateSettings = async (
  prevState: SettingsFormState,
  formData: FormData,
) => {
  const validatedFields = SettingsSchema.safeParse({
    siteName: formData.get("siteName"),
    copyright: formData.get("copyright"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ошибка заполнения формы",
    };
  }

  const { siteName, copyright } = validatedFields.data;

  try {
    await prisma.settings.update({
      where: {
        id: 1,
      },
      data: {
        siteName,
        copyright,
      },
    });
  } catch (err) {
    logError(err);
    return { message: "Ошибка обновления настроек" };
  }

  revalidatePath("/admin");
  redirect("/admin");
};

/** Залогиниться */
export const login = async (
  prevState: LoginFormState | undefined,
  formData: FormData,
) => {
  const validatedFields = LoginSchema.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ошибка заполнения формы",
    };
  }

  const { name, password } = validatedFields.data;

  const user = await getUser(name);

  if (!user) {
    return { message: "Пользователь не найден" };
  }

  if (!PASSWORD_SALT) {
    return { message: "Ошибка конфигурации" };
  }

  const hashedPassword = scryptSync(password, PASSWORD_SALT, 64).toString(
    "hex",
  );

  const passwordsMatch = user.password === hashedPassword;

  if (passwordsMatch) {
    await createSession(name);
    redirect("/admin");
  } else {
    return { message: "Неправильные логин или пароль" };
  }
};

export const logout = async () => {
  await deleteSession();
  redirect("/login");
};
