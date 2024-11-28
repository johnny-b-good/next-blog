// App
// -----------------------------------------------------------------------------
import prisma from "@/lib/db";

export const getPostsForVisitors = async (currentPage: number) => {
  const itemsPerPage = 10;
  const offset = (currentPage - 1) * itemsPerPage;

  const blogPosts = await prisma.blogPost.findMany({
    skip: offset,
    take: itemsPerPage,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      isPublished: true,
    },
  });

  const blogPostsCount = await prisma.blogPost.count();

  const blogPostsPages = Math.ceil(blogPostsCount / itemsPerPage);

  return { blogPosts, blogPostsPages, blogPostsCount };
};

export const getPostsForAdmin = async (currentPage: number, query?: string) => {
  const itemsPerPage = 20;
  const offset = (currentPage - 1) * itemsPerPage;

  const blogPosts = await prisma.blogPost.findMany({
    select: {
      id: true,
      title: true,
      updatedAt: true,
      isPublished: true,
    },
    where: {
      OR: [{ title: { contains: query } }, { content: { contains: query } }],
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: offset,
    take: itemsPerPage,
  });

  const blogPostsCount = await prisma.blogPost.count({
    where: {
      OR: [{ title: { contains: query } }, { content: { contains: query } }],
    },
  });

  const blogPostsPages = Math.ceil(blogPostsCount / itemsPerPage);

  return { blogPosts, blogPostsPages, blogPostsCount };
};

export const getPost = async (id: number) => {
  return await prisma.blogPost.findFirst({
    where: { id },
    include: { images: true },
  });
};

export const getSettings = async () => {
  return await prisma.settings.findFirstOrThrow();
};

export const getUser = async (name: string) => {
  return await prisma.user.findFirst({ where: { name } });
};
