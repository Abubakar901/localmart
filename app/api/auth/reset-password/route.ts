import crypto from "node:crypto";
import bcrypt from "bcryptjs";

import { withErrorHandler } from "@/lib/errorHandler";
import { connectDB } from "@/lib/database";
import { User } from "@/models/User";
import { resetPasswordSchema } from "@/validators/auth";
import { validateRequest } from "@/lib/validateRequest";
import { ResponseJson, ResponseError } from "@/lib/responseHandler";

export const POST = withErrorHandler(async (req: Request) => {
  await connectDB();

  const body = await req.json();
  const { data, error } = await validateRequest(resetPasswordSchema, body);
  if (error) return error;

  const { token, password } = data;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    return ResponseError("This reset link is invalid or has expired.", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return ResponseJson({
    success: true,
    message: "Password reset successfully. You can now sign in.",
  });
});