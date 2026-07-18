import { z } from "zod";

import { PASSWORD_RULES } from "@/lib/constants";

export const emailSchema = z.email("Invalid email address");

// sign up user
export const passwordSchema = z
  .string()
  .min(PASSWORD_RULES.minLength, "Password must be at least 8 characters")
  .regex(PASSWORD_RULES.hasUpper, "Must contain at least one uppercase letter")
  .regex(PASSWORD_RULES.hasNumber, "Must contain at least one number");

const passwordMatchFields = {
  password: passwordSchema,
  confirmPassword: z.string(),
};

const passwordMatchRefine = {
  message: "Password and Confirm Password do not match.",
  path: ["confirmPassword"],
};

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, passwordMatchRefine);

export type RegisterInput = z.infer<typeof registerSchema>;

// forgot password
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// reset password 
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Token is required"),
    ...passwordMatchFields,
  })
  .refine((data) => data.password === data.confirmPassword, passwordMatchRefine);

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;