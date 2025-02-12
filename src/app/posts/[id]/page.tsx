// Lib
// ---------------------------------------------------------------------------
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// App
// ---------------------------------------------------------------------------
import { BlogPostView } from "@/app/ui";
import { getPost } from "@/lib/queries";

export default async function HomePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = parseInt(params.id);

  const blogPost = await getPost(id);

  if (!blogPost) {
    notFound();
  }

  return <BlogPostView key={blogPost.id} blogPost={blogPost} />;
}

export async function generateMetadata(
  props: {
    params: Promise<{ id: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const id = parseInt(params.id);

  const blogPost = await getPost(id);

  if (!blogPost) {
    notFound();
  }

  return {
    title: blogPost.title,
  };
}
