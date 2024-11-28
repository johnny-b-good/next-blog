/*
  Warnings:

  - A unique constraint covering the columns `[postId,name]` on the table `BlogPostImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BlogPostImage_postId_name_key" ON "BlogPostImage"("postId", "name");
