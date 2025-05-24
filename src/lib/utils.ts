// Lib
// -----------------------------------------------------------------------------
import { BlogPostImage } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { THUMBNAIL_FORMAT } from "./consts";

dayjs.locale("ru");

export const formatDateTime = (date: Date): string =>
  dayjs(date).format("DD MMM YYYY, HH:mm");

export const makeImageUrl = (image: BlogPostImage): string =>
  `/uploads/${image.postId}/${image.name}.${image.format}`;

export const makeThumbnailUrl = (image: BlogPostImage): string =>
  `/uploads/${image.postId}/${image.name}__thumb.${THUMBNAIL_FORMAT}`;

export const logError = (err: unknown) => {
  if (typeof err === "string") {
    console.error(err);
  } else if (err instanceof Error) {
    console.error(err.message);
  }
};
