"use client";

import { signIn } from "next-auth/react";
import { GoogleIcon } from "@/components/Icons/GoogleIcon";

export const GoogleSignInButton = ({ label = "Continue with Google" }: { label?: string }) => {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="w-full h-12 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition flex items-center justify-center gap-3 font-semibold text-gray-800"
    >
      <GoogleIcon className="w-5 h-5" />
      {label}
    </button>
  );
};