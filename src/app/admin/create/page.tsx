import { BlogPostForm } from "@/app/admin/ui";
import { createBlogPost } from "@/app/lib/actions";

export default async function AdminCreatePostPage() {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Создать пост</h2>

      <BlogPostForm action={createBlogPost} />
    </div>
  );
}
