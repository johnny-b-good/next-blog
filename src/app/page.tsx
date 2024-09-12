import prisma from "./lib/db";

export default async function Home() {
  const allBlogPosts = await prisma.blogPost.count();

  return <div className="text-xl text-blue-500">next-blog {allBlogPosts}</div>;
}
