// App
// ---------------------------------------------------------------------------
import { BlogPostView } from "@/app/ui";
import { getPaginatedPosts } from "./lib/queries";
import { Pagination } from "@/app/ui";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const { blogPosts, blogPostsPages } = await getPaginatedPosts(currentPage);

  return (
    <section className="grid grid-cols-1 gap-4">
      {blogPosts.map((blogPost) => (
        <BlogPostView key={blogPost.id} blogPost={blogPost} />
      ))}

      <Pagination totalPages={blogPostsPages} />
    </section>
  );
}
