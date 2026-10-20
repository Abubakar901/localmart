"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { AuthHeader } from "@/components/Auth/AuthHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AuthFooter } from "@/components/Auth/AuthFooter";
import { useEmailValidation } from "@/hooks/useEmailValidation";
import { validateEmail } from "@/utils/formValidation";

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const isValidEmail = useEmailValidation(email);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

if (!validateEmail(isValidEmail)) return
    
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      toast.success(data.message);
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
        subHeading="Enter your email address and we'll send you a link to reset your password"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          required
          placeHolder="Enter Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          buttonText="Send Email"
          loadingText="Sending Email..."
          loading={loading}
          additionalClass="mt-6"
        />
      </form>

      <AuthFooter
        linkConfig={{
          preText: "Remembered your password?",
          hrefText: " Sign in",
          href: "/signin",
        }}
      />
    </div>
  );
};
