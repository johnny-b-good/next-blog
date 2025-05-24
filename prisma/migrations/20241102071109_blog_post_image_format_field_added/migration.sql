/*
  Warnings:

  - Added the required column `format` to the `BlogPostImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPostImage" ADD COLUMN     "format" TEXT NOT NULL;
