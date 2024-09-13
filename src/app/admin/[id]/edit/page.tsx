import { notFound } from "next/navigation";

import prisma from "@/app/lib/db";
import { BlogPostForm } from "@/app/admin/ui";
import { updateBlogPost } from "@/app/admin/lib/actions";

export default async function AdminEditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);

  const blogPost = await prisma.blogPost.findFirst({ where: { id } });

  if (!blogPost) {
    notFound();
  }

  const updateBlogPostWithId = updateBlogPost.bind(null, id);

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Редактировать пост</h2>

      <BlogPostForm action={updateBlogPostWithId} blogPost={blogPost} />
    </div>
  );
}
