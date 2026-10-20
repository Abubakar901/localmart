"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { AuthHeader } from "@/components/Auth/AuthHeader";
import { Button } from "@/components/ui/Button";
import { PasswordValidation } from "@/components/Auth/PasswordValidation";
import {
  validatePassword,
  validatePasswordMatch
} from "@/utils/formValidation";

export const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validatePassword(password)) return;
    if (!validatePasswordMatch(password, confirmPassword)) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      toast.success(data.message);
      setTimeout(() => {
        window.location.href = "/signin";
      }, 500);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <AuthHeader
        heading="Forgot your password?"
        subHeading="Enter your email and we'll send you a reset link"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <PasswordValidation
          password={password}
          confirmPassword={confirmPassword}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          buttonText="Reset Password"
          loadingText="Resetting Password..."
          loading={loading}
          additionalClass="mt-6"
        />
      </form>
    </div>
  );
};
