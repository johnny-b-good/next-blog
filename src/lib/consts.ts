import { Accept } from "react-dropzone";

export const THUMBNAIL_DIMENSIONS = [640, 480];
export const THUMBNAIL_FORMAT = "jpeg";
export const MAX_FILE_SIZE = 100000000; // 100 MB in bytes
export const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/gif"];
export const ACCEPTED_FILE_TYPES_WITH_EXTENSIONS: Accept = {
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/gif": [".gif"],
};
