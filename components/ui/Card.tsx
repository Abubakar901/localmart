import { type ReactNode } from "react";
import clsx from "clsx";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-lg border border-gray-200 p-6",
        className,
      )}
    >
      {children}
    </div>
  );
};