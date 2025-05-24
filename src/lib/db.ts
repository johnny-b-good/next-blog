import { PrismaClient } from "@prisma/client";
import fs from "node:fs/promises";
import path from "node:path";

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      blogPostImage: {
        delete: async ({ model, operation, args, query }) => {
          const imageRecord = await query(args);
          if (imageRecord) {
            const imagePath = path.join(
              process.cwd(),
              "public",
              "uploads",
              imageRecord.postId.toString(),
              `${imageRecord.name}.${imageRecord.format}`
            );
            const thumbnailPath = path.join(
              process.cwd(),
              "public",
              "uploads",
              imageRecord.postId.toString(),
              `${imageRecord.name}__thumb.${process.env.THUMBNAIL_FORMAT || "jpg"}`
            );

            await fs.rm(imagePath);
            await fs.rm(thumbnailPath);
          }
        },

        deleteMany: async ({ model, operation, args, query }) => {
          const imageRecords = await query(args);
          for (const imageRecord of imageRecords) {
            const imagePath = path.join(
              process.cwd(),
              "public",
              "uploads",
              imageRecord.postId.toString(),
              `${imageRecord.name}.${imageRecord.format}`
            );
            const thumbnailPath = path.join(
              process.cwd(),
              "public",
              "uploads",
              imageRecord.postId.toString(),
              `${imageRecord.name}__thumb.${process.env.THUMBNAIL_FORMAT || "jpg"}`
            );

            await fs.rm(imagePath);
            await fs.rm(thumbnailPath);
          }
        },
      },
    },
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
