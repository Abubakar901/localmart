"use client";

import { ComponentProps, useId } from "react";

type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = ComponentProps<"select"> & {
  id?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  options: SelectOption[];
  error?: string;
};

export const Select = ({
  id,
  label,
  required,
  placeholder = "Select an option",
  options,
  error,
  ...rest
}: SelectProps) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          defaultValue=""
          className={`h-12 w-full px-4 pr-10 border rounded-xl outline-none transition appearance-none bg-no-repeat bg-[center_right_1rem] ${
            error
              ? "bg-red-50 border-red-500 focus:ring-2 focus:ring-red-500 text-red-900"
              : "bg-gray-50 border-gray-200 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-600 text-gray-900"
          }`}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};