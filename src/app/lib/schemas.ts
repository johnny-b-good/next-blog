import { z } from "zod";

/** Схема данных поста */
export const BlogPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string().min(1, "Обязательное поле"),
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
