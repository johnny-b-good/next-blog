// Lib
// -----------------------------------------------------------------------------
import { FC, ReactNode } from "react";
import { Field, Label, Description } from "@headlessui/react";
import { clsx } from "clsx";

export type FormFieldProps = {
  children: ReactNode;
  className?: string;
  label?: ReactNode;
  description?: ReactNode;
  errors?: Array<string>;
};

/** Field component */
export const FormField: FC<FormFieldProps> = ({
  className,
  children,
  label,
  description,
  errors = [],
}) => {
  return (
    <Field className={clsx("flex flex-col gap-2", className)}>
      {label && <Label className="font-semibold">{label}</Label>}

      {description && (
        <Description className="text-sm text-slate-500">
          {description}
        </Description>
      )}

      {children}

      {errors.length > 0 ? (
        <Description className="text-sm text-red-500">
          {errors.join("; ")}
        </Description>
      ) : null}
    </Field>
  );
};
