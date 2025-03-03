-- CreateTable
CREATE TABLE "BlogPostImage" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "altText" TEXT NOT NULL,
    "originalWidth" INTEGER NOT NULL,
    "originalHeight" INTEGER NOT NULL,
    "originalName" TEXT NOT NULL,
    "originalType" TEXT NOT NULL,
    "thumbnailPath" TEXT NOT NULL,
    "thumbnailWidth" INTEGER NOT NULL,
    "thumbnailHeight" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPostImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlogPostImage" ADD CONSTRAINT "BlogPostImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
