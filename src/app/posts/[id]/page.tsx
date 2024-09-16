// Lib
// ---------------------------------------------------------------------------
import { notFound } from "next/navigation";

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
