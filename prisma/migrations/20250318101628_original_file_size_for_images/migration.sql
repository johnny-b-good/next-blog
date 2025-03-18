/*
  Warnings:

  - Added the required column `originalFileSize` to the `BlogPostImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPostImage" ADD COLUMN     "originalFileSize" INTEGER NOT NULL;
