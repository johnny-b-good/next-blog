// Lib
// -----------------------------------------------------------------------------
import { z } from "zod";

/** Схема данных поста */
export const BlogPostSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Обязательное поле"),
  content: z.string().min(1, "Обязательное поле"),
  isPublished: z.coerce.boolean(),
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

export const SessionSchema = z.object({
  name: z.string(),
  expiresAt: z.coerce.date(),
});
