// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";

/** Loader component */
export const Loader: FC = () => {
  const size = 64;
  const strokeWidth = 8;

  const CIRCLE_LENGTH = Math.PI * (size - strokeWidth);
  const SECTION_LENGTH = (2 / 3) * CIRCLE_LENGTH;

  return (
    <div className="flex-column flex h-full w-full flex-col items-center justify-center gap-2 p-16">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        className="size-16 animate-spin text-cyan-500"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={size / 2 - strokeWidth / 2}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          opacity="0.1"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={size / 2 - strokeWidth / 2}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          strokeDasharray={`${SECTION_LENGTH}, ${CIRCLE_LENGTH - SECTION_LENGTH}`}
          strokeDashoffset="0"
        />
      </svg>

      <div className="">Loading...</div>
    </div>
  );
};
