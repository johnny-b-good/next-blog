// Lib
// -----------------------------------------------------------------------------
import { clsx } from "clsx";
import { BlogPostImage } from "@prisma/client";
import Image from "next/image";

// App
// -----------------------------------------------------------------------------
import { Checkbox, FormField } from "@/ui";
import { makeImageUrl, makeThumbnailUrl } from "@/lib/utils";

// Props
// -----------------------------------------------------------------------------
export interface ImagesListProps {
  images: Array<BlogPostImage>;
  className?: string;
}

/** Images list component */
export const ImagesList = ({ images, className }: ImagesListProps) => {
  return (
    <div>
      <div className="mb-2 font-semibold">Прикрепленные файлы</div>

      <div className={clsx("flex flex-wrap gap-4", className)}>
        {images.map((image) => (
          <a
            key={image.id}
            href={makeImageUrl(image)}
            className="flex w-64 flex-col rounded bg-white shadow"
            target="_blank"
          >
            <Image
              src={makeThumbnailUrl(image)}
              width={image.thumbnailWidth}
              height={image.thumbnailHeight}
              alt=""
              className="rounded-t"
            />

            <div className="flex flex-col gap-2 p-2">
              <div>
                <div
                  className="truncate text-xs"
                  title={`${image.name}.${image.format}`}
                >
                  {image.name}.{image.format}
                </div>

                <div className="text-xs text-slate-500">
                  {image.format.toUpperCase()}{" "}
                  {`${image.originalWidth}x${image.originalHeight}`}
                </div>
              </div>

              <FormField
                className="text-xs"
                label="Удалить?"
                labelPosition="right"
              >
                <Checkbox size="4" />
              </FormField>
            </div>
          </a>
        ))}

        {images.length === 0 && <div className="px-3 py-2">Список пуст</div>}
      </div>
    </div>
  );
};
