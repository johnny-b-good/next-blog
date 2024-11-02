// Lib
// -----------------------------------------------------------------------------
import { z } from "zod";

// App
// -----------------------------------------------------------------------------
import { MAX_FILE_SIZE, ACCEPTED_FILE_TYPES } from "@/lib/consts";

/** Схема данных поста */
export const BlogPostSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Обязательное поле"),
  content: z.string().min(1, "Обязательное поле"),
  isPublished: z.coerce.boolean(),
  files: z.optional(
    z.array(
      z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, `Bad file size`)
        .refine(
          (file) => ACCEPTED_FILE_TYPES.includes(file.type),
          "Bad file type",
        ),
    ),
  ),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/** Схема данных для создания поста */
export const CreateBlogPostSchema = BlogPostSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

/** Схема данных для обновления поста */
export const UpdateBlogPostSchema = BlogPostSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const SettingsSchema = z.object({
  siteName: z.string().min(1, "Обязательное поле"),
  copyright: z.string().min(1, "Обязательное поле"),
});

export const LoginSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
  password: z.string().min(1, "Обязательное поле"),
});
