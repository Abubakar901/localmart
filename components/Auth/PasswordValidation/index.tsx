"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Tooltip } from "@/components/ui/Tooltip";
import { usePasswordValidation } from "@/components/Auth/PasswordValidation/hooks/usePasswordValidation";

type PasswordValidationProps = {
  password: string;
  confirmPassword: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidChange: (isValid: boolean) => void;
};

export const PasswordValidation = ({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  onValidChange,
}: PasswordValidationProps) => {
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const { checks, isPasswordValid, passwordsMatch, isValid } =
    usePasswordValidation(password, confirmPassword);

  const showConfirmError =
    confirmTouched && confirmPassword.length > 0 && !passwordsMatch;

  useEffect(() => {
    onValidChange(isValid);
  }, [isValid]);

  return (
    <div className="space-y-4">
      <Tooltip
        show={passwordFocused && !isPasswordValid}
        content={
          <>
            <p className="text-xs font-medium text-gray-500 mb-2">
              Password must contain:
            </p>
            <ul className="space-y-1">
              <ChecklistItem
                met={checks.minLength}
                label="At least 8 characters"
              />
              <ChecklistItem
                met={checks.hasUpper}
                label="One uppercase letter"
              />
              <ChecklistItem met={checks.hasNumber} label="One number" />
            </ul>
          </>
        }
        align="right"
      >
        <Input
          placeHolder="Enter password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />
      </Tooltip>

      <div>
        <Input
          placeHolder="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          onBlur={() => setConfirmTouched(true)}
        />
        {showConfirmError && (
          <p className="mt-1.5 text-sm text-red-500">Passwords do not match</p>
        )}
      </div>
    </div>
  );
};

const ChecklistItem = ({ met, label }: { met: boolean; label: string }) => (
  <li
    className={`flex items-center gap-1.5 text-xs ${met ? "text-green-600" : "text-gray-400"}`}
  >
    {met ? <Check size={14} /> : <X size={14} />}
    {label}
  </li>
);
