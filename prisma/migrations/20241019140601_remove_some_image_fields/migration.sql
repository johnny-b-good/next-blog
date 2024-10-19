/*
  Warnings:

  - You are about to drop the column `altText` on the `BlogPostImage` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `BlogPostImage` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `BlogPostImage` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailPath` on the `BlogPostImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogPostImage" DROP COLUMN "altText",
DROP COLUMN "name",
DROP COLUMN "path",
DROP COLUMN "thumbnailPath";
