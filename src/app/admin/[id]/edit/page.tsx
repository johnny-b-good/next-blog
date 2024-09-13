import { notFound } from "next/navigation";

import prisma from "@/app/lib/db";
import { Breadcrumbs } from "@/app/ui";
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
      <Breadcrumbs
        className="mb-4"
        parts={[
          { text: "Администрирование", url: "/admin" },
          { text: "Редактировать пост" },
        ]}
      />

      <BlogPostForm action={updateBlogPostWithId} blogPost={blogPost} />
    </div>
  );
}
