"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

import { AuthHeader } from "@/components/Auth/AuthHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AuthFooter } from "@/components/Auth/AuthFooter";
import { useEmailValidation } from "@/hooks/useEmailValidation";
import { validateEmail, validatePassword } from "@/utils/formValidation";

export const SignInForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const isValidEmail = useEmailValidation(email);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateEmail(isValidEmail)) return;
    if (!validatePassword(password)) return;

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid email or password");
        return;
      }

      toast.success("Signed in successfully");
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
        heading="Sign in to your Account"
        subHeading="Enter your details to access your account"
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

        <div>
          <Input
          label="Password"
          required
            placeHolder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-2 text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-green-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          buttonText="Sign In"
          loadingText="Signing In..."
          loading={loading}
        />
      </form>

      <AuthFooter
        linkConfig={{
          preText: "Don't have an account?",
          hrefText: "Sign up",
          href: "/signup",
        }}
        showSocial={true}
        showTerms={true}
      />
    </div>
  );
};
