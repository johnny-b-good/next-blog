// Lib
// -----------------------------------------------------------------------------
import fs from "node:fs/promises";
import prisma from "@/lib/db";
import sharp from "sharp";
import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

export const formatDateTime = (date: Date): string =>
  dayjs(date).format("DD MMM YYYY, HH:mm");

export const saveUploadedFiles = async (postId: number, files: Array<File>) => {
  for (const file of files) {
    const fileArrayBuffer = await file.arrayBuffer();
    const fileBuffer = await Buffer.from(fileArrayBuffer);

    const image = sharp(fileBuffer);
    const imageMetadata = await image.metadata();

    const thumbnail = image.resize(800, 600);
    const thumbnailMetadata = await thumbnail.metadata();

    await prisma.$transaction(async (tx) => {
      const blogPostImage = await tx.blogPostImage.create({
        data: {
          postId,
          originalWidth: imageMetadata.width ?? 0,
          originalHeight: imageMetadata.height ?? 0,
          originalName: file.name,
          originalType: file.type,
          thumbnailWidth: thumbnailMetadata.width ?? 0,
          thumbnailHeight: thumbnailMetadata.height ?? 0,
        },
      });

      await fs.writeFile(
        `uploads/images/${postId}/${blogPostImage.id}.${imageMetadata.format}`,
        fileBuffer,
      );

      await fs.writeFile(
        `uploads/thumbnails/${postId}/${blogPostImage.id}.png`,
        await thumbnail.toFormat("png").toBuffer(),
      );
    });
  }
};
