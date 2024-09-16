// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import { Description, DescriptionProps } from "@headlessui/react";
import { clsx } from "clsx";

// Props
// -----------------------------------------------------------------------------
export type FieldErrorProps = DescriptionProps & {
  errors?: Array<string>;
};

/** Field error component */
export const FieldError: FC<FieldErrorProps> = ({
  className,
  errors = [],
  ...props
}) => {
  return errors.length > 0 ? (
    <Description className={clsx("text-sm text-red-500", className)} {...props}>
      {errors.join("; ")}
    </Description>
  ) : null;
};
