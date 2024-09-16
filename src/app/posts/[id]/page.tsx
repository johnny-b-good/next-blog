// Lib
// ---------------------------------------------------------------------------
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// App
// ---------------------------------------------------------------------------
import { BlogPostView } from "@/app/ui";
import { getPost } from "@/lib/queries";

export default async function HomePage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  const blogPost = await getPost(id);

  if (!blogPost) {
    notFound();
  }

  return <BlogPostView key={blogPost.id} blogPost={blogPost} />;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = parseInt(params.id);

  const blogPost = await getPost(id);

  if (!blogPost) {
    notFound();
  }

  return {
    title: blogPost.title,
  };
}
