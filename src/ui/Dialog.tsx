// Lib
// -----------------------------------------------------------------------------
import { FC, ReactNode } from "react";
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import CSS from "csstype";
import { XMarkIcon } from "@heroicons/react/24/outline";

// App
// -----------------------------------------------------------------------------
import { Button } from "./Button";

// Props
// -----------------------------------------------------------------------------
export interface DialogProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  title?: string;
  description?: ReactNode;
  children?: ReactNode;
  width?: CSS.Properties["width"];
}

/** Dialog component */
export const Dialog: FC<DialogProps> = ({
  open,
  onOk,
  onCancel,
  title,
  description,
  children,
  width,
}) => {
  return (
    <HeadlessDialog
      open={open}
      onClose={onCancel}
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-10 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      transition
    >
      <DialogPanel
        className="max-w-xl space-y-4 rounded border bg-white shadow-xl"
        style={{ width }}
      >
        {title && (
          <DialogTitle className="flex items-center rounded-t border-b border-b-slate-300 px-6 py-4 text-lg font-semibold">
            {title}

            <div className="flex-grow" />

            <Button variant="icon" onClick={onCancel}>
              <XMarkIcon className="size-6 flex-none" />
            </Button>
          </DialogTitle>
        )}

        <div className="px-6 py-4">
          {description && <Description>{description}</Description>}

          {children}
        </div>

        <div className="flex justify-end gap-4 rounded-b border-t border-t-slate-300 bg-slate-100 px-6 py-4">
          <Button variant="default" onClick={onCancel}>
            Cancel
          </Button>

          <Button variant="primary" onClick={onOk}>
            OK
          </Button>
        </div>
      </DialogPanel>
    </HeadlessDialog>
  );
};
