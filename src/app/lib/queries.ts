import prisma from "@/app/lib/db";

export const getPaginatedPosts = async (currentPage: number) => {
  const itemsPerPage = 10;
  const offset = (currentPage - 1) * itemsPerPage;

  const blogPosts = await prisma.blogPost.findMany({
    skip: offset,
    take: itemsPerPage,
  });

  const blogPostsCount = await prisma.blogPost.count();

  const blogPostsPages = Math.ceil(blogPostsCount / itemsPerPage);

  return { blogPosts, blogPostsPages, blogPostsCount };
};
