"use client";

import { type ReactNode } from "react";

type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  show: boolean;
  position?: "top" | "bottom";
  align?: "left" | "center" | "right";
};

export const Tooltip = ({
  children,
  content,
  show,
  position = "bottom",
  align = "left",
}: TooltipProps) => {
  const alignClasses = {
    left: "left-0",
    center: "left-1/2 -translate-x-1/2",
    right: "right-0",
  };

  const arrowAlignClasses = {
    left: "left-6",
    center: "left-1/2 -translate-x-1/2",
    right: "right-6",
  };

  return (
    <div className="relative">
      {children}

      {show && (
        <div
          className={`absolute z-10 w-auto bg-white border border-gray-200 rounded-lg shadow-xl pl-3 pr-5 py-3
            ${position === "bottom" ? "top-full mt-2" : "bottom-full mb-2"}
            ${alignClasses[align]}
          `}
        >
          {content}

          <div
            className={`absolute w-3 h-3 bg-white border-gray-200 rotate-45
              ${position === "bottom" ? "-top-1.5 border-l border-t" : "-bottom-1.5 border-r border-b"}
              ${arrowAlignClasses[align]}
            `}
          />
        </div>
      )}
    </div>
  );
};