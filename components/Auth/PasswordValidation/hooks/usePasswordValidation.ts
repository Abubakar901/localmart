import { PASSWORD_RULES } from "@/lib/constants";

export function usePasswordValidation(password: string, confirmPassword: string) {
  const checks = {
    minLength: password.length >= PASSWORD_RULES.minLength,
    hasUpper: PASSWORD_RULES.hasUpper.test(password),
    hasNumber: PASSWORD_RULES.hasNumber.test(password),
  };

  const isPasswordValid = Object.values(checks).every(Boolean);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const isValid = isPasswordValid && passwordsMatch;

  return { checks, isPasswordValid, passwordsMatch, isValid };
}