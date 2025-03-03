// Lib
// -----------------------------------------------------------------------------
import fs from "node:fs/promises";
import path from "node:path";
import prisma from "@/lib/db";
import sharp from "sharp";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { v4 as uuidv4 } from "uuid";

// App
// -----------------------------------------------------------------------------
import { THUMBNAIL_DIMENSIONS, THUMBNAIL_FORMAT } from "@/lib/consts";
import { BlogPostImage } from "@prisma/client";

dayjs.locale("ru");

export const formatDateTime = (date: Date): string =>
  dayjs(date).format("DD MMM YYYY, HH:mm");

export const saveUploadedFiles = async (postId: number, files: Array<File>) => {
  const uploadsDirPath = makeUploadsDirPath();
  await fs.mkdir(uploadsDirPath, { recursive: true });

  for (const file of files) {
    if (file.size === 0) {
      continue;
    }

    const imageArrayBuffer = await file.arrayBuffer();
    const imageBuffer = await Buffer.from(imageArrayBuffer);

    const image = sharp(imageBuffer);
    const imageMetadata = await image.metadata();

    if (!imageMetadata.format) {
      throw new Error("Bad image format");
    }

    const thumbnail = image.resize(...THUMBNAIL_DIMENSIONS);
    const thumbnailMetadata = await thumbnail.metadata();
    const thumbnailBuffer = await thumbnail
      .toFormat(THUMBNAIL_FORMAT)
      .toBuffer();

    const newImageName = uuidv4();

    await prisma.$transaction(async (tx) => {
      const imageRecord = await tx.blogPostImage.create({
        data: {
          postId,
          name: newImageName,
          format: imageMetadata.format as string,
          originalWidth: imageMetadata.width ?? 0,
          originalHeight: imageMetadata.height ?? 0,
          originalName: file.name,
          originalType: file.type,
          thumbnailWidth: thumbnailMetadata.width ?? 0,
          thumbnailHeight: thumbnailMetadata.height ?? 0,
        },
      });

      const postUploadsDirPath = makePostUploadsDirPath(postId);
      await fs.mkdir(postUploadsDirPath, { recursive: true });

      const imageFilePath = makeImagePath(imageRecord);
      await fs.writeFile(imageFilePath, imageBuffer);

      const thumbnailFilePath = makeThumbnailPath(imageRecord);
      await fs.writeFile(thumbnailFilePath, thumbnailBuffer);
    });
  }
};

export const logError = (err: unknown) => {
  if (typeof err === "string") {
    console.error(err);
  } else if (err instanceof Error) {
    console.error(err.message);
  }
};

export const makeImageUrl = (image: BlogPostImage): string =>
  `/uploads/${image.postId}/${image.name}.${image.format}`;

export const makeThumbnailUrl = (image: BlogPostImage): string =>
  `/uploads/${image.postId}/${image.name}__thumb.${THUMBNAIL_FORMAT}`;

export const makeUploadsDirPath = (): string =>
  path.join(process.cwd(), "public", "uploads");

export const makePostUploadsDirPath = (postId: number): string =>
  path.join(makeUploadsDirPath(), postId.toString());

export const makeImagePath = (image: BlogPostImage): string =>
  path.join(
    makePostUploadsDirPath(image.postId),
    `${image.name}.${image.format}`,
  );

export const makeThumbnailPath = (image: BlogPostImage): string =>
  path.join(
    makePostUploadsDirPath(image.postId),
    `${image.name}__thumb.${THUMBNAIL_FORMAT}`,
  );
