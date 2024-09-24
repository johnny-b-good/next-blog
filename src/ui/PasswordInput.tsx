"use client";

// Lib
// -----------------------------------------------------------------------------
import { FC, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// import { clsx } from "clsx";

// App
// -----------------------------------------------------------------------------
import { Input, InputProps } from "./Input";

// Props
// -----------------------------------------------------------------------------
export type PasswordInputProps = InputProps;

/** Password input component */
export const PasswordInput: FC<PasswordInputProps> = (props) => {
  const [type, setType] = useState<InputProps["type"]>("password");

  return (
    <div className="relative">
      <Input {...props} className="w-full pr-10" type={type} />

      <div
        className="absolute right-2 top-1/2 size-6 -translate-y-1/2 cursor-pointer text-slate-500 transition-colors hover:text-cyan-500"
        onClick={() => {
          setType((prev) => (prev === "password" ? "text" : "password"));
        }}
      >
        {type === "password" && <EyeIcon className="size-6" />}
        {type === "text" && <EyeSlashIcon className="size-6" />}
      </div>
    </div>
  );
};
