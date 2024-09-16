// App
// -----------------------------------------------------------------------------
import { BlogPostForm } from "@/app/admin/posts/ui";
import { Breadcrumbs } from "@/ui";
import { createBlogPost } from "@/lib/actions";

export default async function AdminCreatePostPage() {
  return (
    <div>
      <Breadcrumbs
        className="mb-8"
        parts={[
          { text: "Администрирование", url: "/admin" },
          { text: "Записи", url: "/admin/posts" },
          { text: "Создать пост" },
        ]}
      />

      <BlogPostForm action={createBlogPost} />
    </div>
  );
}
