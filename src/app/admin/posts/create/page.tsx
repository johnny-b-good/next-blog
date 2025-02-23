// Lib
// -----------------------------------------------------------------------------
import { Metadata } from "next";

// App
// -----------------------------------------------------------------------------
import { BlogPostForm } from "@/app/admin/posts/ui";
import { createBlogPost } from "@/lib/actions";
import { Breadcrumbs } from "@/app/ui";

export default async function AdminCreatePostPage() {
  return (
    <div>
      <Breadcrumbs
        className="mb-8"
        parts={[
          { content: "Администрирование", url: "/admin" },
          { content: "Записи", url: "/admin/posts" },
          { content: "Создать пост" },
        ]}
      />

      <BlogPostForm action={createBlogPost} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Создать пост",
};
