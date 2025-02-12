// Lib
// -----------------------------------------------------------------------------
import { notFound } from "next/navigation";
import { Metadata } from "next";

// App
// -----------------------------------------------------------------------------
import { getPost } from "@/lib/queries";
import { Breadcrumbs } from "@/ui";
import { BlogPostForm } from "@/app/admin/posts/ui";
import { updateBlogPost } from "@/lib/actions";

export default async function AdminEditPostPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const id = parseInt(params.id);

  const blogPost = await getPost(id);

  if (!blogPost) {
    notFound();
  }

  const updateBlogPostWithId = updateBlogPost.bind(null, id);

  return (
    <div>
      <Breadcrumbs
        className="mb-8"
        parts={[
          { text: "Администрирование", url: "/admin" },
          { text: "Записи", url: "/admin/posts" },
          { text: "Редактировать пост" },
        ]}
      />

      <BlogPostForm action={updateBlogPostWithId} blogPost={blogPost} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Редактировать пост",
};
