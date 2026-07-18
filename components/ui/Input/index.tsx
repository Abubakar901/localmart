"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = {
  placeHolder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void; 
};

export const Input = ({
  placeHolder,
  type,
  value,
  onChange,
  onFocus,
  onBlur,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isPasswordField = type === "password";
  const actualType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className="relative">
      <input
        placeholder={placeHolder ?? ""}
        type={actualType}
        value={value}
        onChange={onChange}
        className={`h-12 w-full px-4 pr-11 border rounded-xl outline-none focus:ring-2 focus:ring-green-600 transition`}
        onFocus={onFocus}
        onBlur={onBlur}
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
  );
};
