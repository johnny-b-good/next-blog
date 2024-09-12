// App
// ---------------------------------------------------------------------------
import prisma from "@/app/lib/db";
import { BlogPostView } from "@/app/ui";

export default async function Home() {
  const allBlogPosts = await prisma.blogPost.findMany();

  return (
    <main className="max-w-prose p-8">
      {allBlogPosts.map((blogPost) => (
        <BlogPostView key={blogPost.id} blogPost={blogPost} />
      ))}
    </main>
  );
}
