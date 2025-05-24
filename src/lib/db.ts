import { PrismaClient } from "@prisma/client";
import fs from "node:fs/promises";
import path from "node:path";

// App
// -----------------------------------------------------------------------------
import {
  makeImagePath,
  makeThumbnailPath,
} from "@/lib/imageUtils";

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      blogPostImage: {
        delete: async ({ model, operation, args, query }) => {
          const imageRecord = await query(args);
          if (imageRecord) {
            await fs.rm(makeImagePath(imageRecord));
            await fs.rm(makeThumbnailPath(imageRecord));
          }
        },

        deleteMany: async ({ model, operation, args, query }) => {
          const imageRecords = await query(args);
          for (const imageRecord of imageRecords) {
            await fs.rm(makeImagePath(imageRecord));
            await fs.rm(makeThumbnailPath(imageRecord));
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
