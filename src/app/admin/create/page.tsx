// App
// -----------------------------------------------------------------------------
import { BlogPostForm } from "@/app/admin/ui";
import { Breadcrumbs } from "@/ui";
import { createBlogPost } from "@/lib/actions";

export default async function AdminCreatePostPage() {
  return (
    <div>
      <Breadcrumbs
        className="mb-4"
        parts={[
          { text: "Администрирование", url: "/admin" },
          { text: "Создать пост" },
        ]}
      />

      <BlogPostForm action={createBlogPost} />
    </div>
  );
}
