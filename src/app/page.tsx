// App
// ---------------------------------------------------------------------------
import { getPostsForVisitors } from "@/lib/queries";
import { BlogPostView, Pagination } from "@/app/ui";

export default async function HomePage(
  props: {
    searchParams?: Promise<{
      page?: string;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  const { blogPosts, blogPostsPages } = await getPostsForVisitors(currentPage);

  return (
    <section className="grid grid-cols-1 gap-4">
      {blogPosts.map((blogPost) => (
        <BlogPostView key={blogPost.id} blogPost={blogPost} />
      ))}

      <Pagination totalPages={blogPostsPages} />
    </section>
  );
}
