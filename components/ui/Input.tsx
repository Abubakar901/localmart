"use client";

import { useState, ComponentProps, useId } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = ComponentProps<"input"> & {
  id?: string;
  label?: string;
  required?: boolean;
  placeHolder: string;
  type: string;
  error?: string;
};

export const Input = ({
  id,
  label,
  required,
  placeHolder,
  type,
  error,
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isPasswordField = type === "password";
  const actualType = isPasswordField && showPassword ? "text" : type;

  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          placeholder={placeHolder ?? ""}
          type={actualType}
          className={`h-12 w-full px-4 pr-11 border rounded-xl outline-none transition ${
            error
              ? "bg-red-50 border-red-500 focus:ring-2 focus:ring-red-500"
              : "bg-gray-50 border-gray-200 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-600"
          }`}
          {...rest}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};