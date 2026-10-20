"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { AuthHeader } from "@/components/Auth/AuthHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AuthFooter } from "@/components/Auth/AuthFooter";
import { PasswordValidation } from "@/components/Auth/PasswordValidation";
import { useEmailValidation } from "@/hooks/useEmailValidation";
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from "@/utils/formValidation";

export const SignUpForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const isValidEmail = useEmailValidation(email);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateEmail(isValidEmail)) return;
    if (!validatePassword(password)) return;
    if (!validatePasswordMatch(password, confirmPassword)) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      toast.success(data.message);
      setTimeout(() => {
        window.location.href = "/";
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
        heading="Create your Account"
        subHeading="Join LocalMart and start shopping from local sellers"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email address"
          required
          placeHolder="Enter Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordValidation
          password={password}
          confirmPassword={confirmPassword}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          buttonText="Sign Up"
          loadingText="Signing Up..."
          loading={loading}
          additionalClass="mt-6"
        />
      </form>

      <AuthFooter
        linkConfig={{
          preText: "Already have an account?",
          hrefText: "Sign in",
          href: "/signin",
        }}
        showSocial={true}
        showTerms={true}
      />
    </div>
  );
};
