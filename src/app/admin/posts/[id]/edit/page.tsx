// Lib
// -----------------------------------------------------------------------------
import { notFound } from "next/navigation";
import { Metadata } from "next";

// App
// -----------------------------------------------------------------------------
import { getPost, getPostImages } from "@/lib/queries";
import { BlogPostForm } from "@/app/admin/posts/ui";
import { updateBlogPost } from "@/lib/actions";
import { Breadcrumbs } from "@/app/ui";

export default async function AdminEditPostPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = parseInt(params.id);

  const blogPost = await getPost(id);

  if (!blogPost) {
    notFound();
  }

  const blogPostImages = await getPostImages(id);

  const updateBlogPostWithId = updateBlogPost.bind(null, id);

  return (
    <div>
      <Breadcrumbs
        className="mb-8"
        parts={[
          { content: "Администрирование", url: "/admin" },
          { content: "Записи", url: "/admin/posts" },
          { content: "Редактировать пост" },
        ]}
      />

      <BlogPostForm
        action={updateBlogPostWithId}
        blogPost={blogPost}
        blogPostImages={blogPostImages}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Редактировать пост",
};
