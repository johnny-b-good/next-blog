// Lib
// -----------------------------------------------------------------------------
import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import prisma from "@/lib/db";
import sharp, { Sharp, Metadata } from "sharp";
import { v4 as uuidv4 } from "uuid";
import { BlogPostImage } from "@prisma/client";

// App
// -----------------------------------------------------------------------------
import { THUMBNAIL_DIMENSIONS, THUMBNAIL_FORMAT } from "@/lib/consts";

export const saveUploadedFiles = async (postId: number, files: Array<File>) => {
  const uploadsDirPath = makeUploadsDirPath();
  await fs.mkdir(uploadsDirPath, { recursive: true });

  for (const file of files) {
    if (file.size === 0) {
      continue;
    }

    const { image, imageBuffer, imageMetadata } = await imageFromFile(file);

    const { thumbnailMetadata, thumbnailBuffer } =
      await thumbnailFromImage(image);

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

export const deleteUploadedFiles = async (deletedFileIds: Array<number>) => {
  for (const fileId of deletedFileIds) {
    const deletedFile = await prisma.blogPostImage.delete({
      where: { id: fileId },
    });

    await fs.rm(makeImagePath(deletedFile));
    await fs.rm(makeThumbnailPath(deletedFile));
  }
};

const makeUploadsDirPath = (): string =>
  path.join(process.cwd(), "public", "uploads");

const makePostUploadsDirPath = (postId: number): string =>
  path.join(makeUploadsDirPath(), postId.toString());

const makeImagePath = (image: BlogPostImage): string =>
  path.join(
    makePostUploadsDirPath(image.postId),
    `${image.name}.${image.format}`,
  );

const makeThumbnailPath = (image: BlogPostImage): string =>
  path.join(
    makePostUploadsDirPath(image.postId),
    `${image.name}__thumb.${THUMBNAIL_FORMAT}`,
  );

const imageFromFile = async (
  file: File,
): Promise<{ image: Sharp; imageBuffer: Buffer; imageMetadata: Metadata }> => {
  const imageArrayBuffer = await file.arrayBuffer();
  const imageBuffer = Buffer.from(imageArrayBuffer);

  const image = sharp(imageBuffer);
  const imageMetadata = await image.metadata();

  if (!imageMetadata.format) {
    throw new Error("Bad image format");
  }

  return { image, imageBuffer, imageMetadata };
};

const thumbnailFromImage = async (
  image: Sharp,
): Promise<{
  thumbnail: Sharp;
  thumbnailBuffer: Buffer;
  thumbnailMetadata: Metadata;
}> => {
  const thumbnail = image.resize(...THUMBNAIL_DIMENSIONS);
  const thumbnailMetadata = await thumbnail.metadata();
  const thumbnailBuffer = await thumbnail.toFormat(THUMBNAIL_FORMAT).toBuffer();

  return {
    thumbnail,
    thumbnailMetadata,
    thumbnailBuffer,
  };
};
