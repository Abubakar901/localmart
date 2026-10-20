"use client";

import { ComponentProps, useId } from "react";

type TextareaProps = ComponentProps<"textarea"> & {
  id?: string;
  label?: string;
  required?: boolean;
  placeHolder?: string;
  error?: string;
};

export const Textarea = ({
  id,
  label,
  required,
  placeholder,
  placeHolder,
  error,
  rows = 4,
  ...rest
}: TextareaProps) => {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const textareaPlaceholder = placeholder ?? placeHolder ?? "";

  return (
    <div>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        placeholder={textareaPlaceholder}
        className={`w-full p-4 border rounded-xl outline-none transition resize-none ${
          error
            ? "bg-red-50 border-red-500 focus:ring-2 focus:ring-red-500"
            : "bg-gray-50 border-gray-200 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-600"
        }`}
        {...rest}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};