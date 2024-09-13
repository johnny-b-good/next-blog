"use server";

// Lib
// -----------------------------------------------------------------------------
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// App
// -----------------------------------------------------------------------------
import prisma from "@/app/lib/db";
import { CreateBlogPostSchema, UpdateBlogPostSchema } from "../../lib/schemas";

/** Состояние формы поста */
export type BlogPostFormState = {
  errors?: {
    title?: string[];
    content?: string[];
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

  revalidatePath("/admin");
  redirect("/admin");
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

  revalidatePath("/admin");
  redirect("/admin");
};

/** Удалить пост */
export const deleteBlogPost = async (id: number) => {
  try {
    await prisma.blogPost.delete({ where: { id } });
  } catch {
    message: "Ошибка удаления поста";
  }

  revalidatePath("/admin");
  redirect("/admin");
};
