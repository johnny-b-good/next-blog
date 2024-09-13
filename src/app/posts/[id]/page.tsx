// App
// ---------------------------------------------------------------------------
import { BlogPostView } from "@/app/ui";
import { getPost } from "@/app/lib/queries";
import { notFound } from "next/navigation";

export default async function HomePage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  const blogPost = await getPost(id);

  if (!blogPost) {
    notFound();
  }

  return (
    <main className="mx-auto my-8 grid max-w-5xl grid-cols-1 gap-4">
      <BlogPostView key={blogPost.id} blogPost={blogPost} />
    </main>
  );
}
