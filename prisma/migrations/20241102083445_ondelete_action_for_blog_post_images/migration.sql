-- DropForeignKey
ALTER TABLE "BlogPostImage" DROP CONSTRAINT "BlogPostImage_postId_fkey";

-- AddForeignKey
ALTER TABLE "BlogPostImage" ADD CONSTRAINT "BlogPostImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
