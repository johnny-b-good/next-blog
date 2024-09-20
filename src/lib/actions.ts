"use server";

// Lib
// -----------------------------------------------------------------------------
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

// App
// -----------------------------------------------------------------------------
import prisma from "@/lib/db";
import {
  CreateBlogPostSchema,
  UpdateBlogPostSchema,
  LoginSchema,
  SettingsSchema,
} from "@/lib/schemas";
import { signIn, signOut } from "@/auth";

/** Состояние формы поста */
export type BlogPostFormState = {
  errors?: {
    title?: string[];
    content?: string[];
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
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ошибка заполнения формы",
    };
  }

  const { title, content } = validatedFields.data;

  try {
    await prisma.blogPost.create({
      data: {
        title,
        content,
      },
    });
  } catch {
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
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ошибка заполнения формы",
    };
  }

  const { title, content } = validatedFields.data;

  try {
    await prisma.blogPost.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });
  } catch {
    return { message: "Ошибка обновления поста" };
  }

  revalidatePath("/admin/posts");
  redirect("/admin/posts");
};

/** Удалить пост */
export const deleteBlogPost = async (id: number) => {
  try {
    await prisma.blogPost.delete({ where: { id } });
  } catch {
    message: "Ошибка удаления поста";
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
  } catch {
    return { message: "Ошибка обновления настроек" };
  }

  revalidatePath("/admin");
  redirect("/admin");
};

/** Залогиниться */
export const login = async (prevState: LoginFormState, formData: FormData) => {
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

  try {
    await signIn("credentials", validatedFields.data);
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { message: "Неправильные логин или пароль" };
      } else {
        return { message: "Ошибка входа" };
      }
    }
    throw error;
  }

  revalidatePath("/admin");
  redirect("/admin");
};

export const logout = async () => {
  await signOut();
};
