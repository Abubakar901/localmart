import { emailSchema } from "@/validators/auth";

export const useEmailValidation = (email: string) =>  {
  return emailSchema.safeParse(email).success;
}