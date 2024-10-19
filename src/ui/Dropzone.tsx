"use client";

// Lib
// -----------------------------------------------------------------------------
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { clsx } from "clsx";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

// Props
// -----------------------------------------------------------------------------
export type DropzoneProps = {
  className?: string;
  name?: string;
  required?: boolean;
  dropzoneOptions?: DropzoneOptions;
};

export const Dropzone = ({
  className,
  name,
  required,
  dropzoneOptions,
}: DropzoneProps) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      ...dropzoneOptions,
      onDrop: (incomingFiles) => {
        if (hiddenInputRef.current) {
          const dataTransfer = new DataTransfer();
          incomingFiles.forEach((v) => {
            dataTransfer.items.add(v);
          });

          hiddenInputRef.current.files = dataTransfer.files;
        }
      },
    });

  return (
    <div className={clsx("flex w-full flex-col gap-4", className)}>
      <div
        className={clsx(
          "flex w-full flex-col items-center gap-4 rounded border border-dashed border-slate-300 px-6 py-4 text-slate-700 outline-none transition-colors",
          "focus:border-cyan-300 focus:ring focus:ring-cyan-200 focus:ring-opacity-50",
          isDragActive && "border-cyan-300 ring ring-cyan-200 ring-opacity-50",
        )}
        {...getRootProps()}
      >
        <input
          type="file"
          name={name}
          required={required}
          style={{ opacity: 0 }}
          ref={hiddenInputRef}
        />

        <input name={name} {...getInputProps()} />

        <ArrowUpOnSquareIcon className="size-12 text-cyan-500" />

        <div>Перетащите файлы сюда или нажмите для выбора файлов</div>
      </div>

      {acceptedFiles.length > 0 && (
        <div className="flex w-full flex-col gap-2">
          {acceptedFiles.map((name) => (
            <div key={name.path}>{name.path}</div>
          ))}
        </div>
      )}
    </div>
  );
};
