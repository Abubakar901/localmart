import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/database";
import { User } from "@/models/User";
import { registerSchema } from "@/validators/auth";
import { withErrorHandler } from "@/lib/errorHandler";
import { ResponseJson, ResponseError } from "@/lib/responseHandler";
import { validateRequest } from "@/lib/validateRequest";

export const POST = withErrorHandler(async (req: Request) => {
  await connectDB();

  const body = await req.json();

  const { data, error } = await validateRequest(registerSchema, body);
  if (error) return error;

  const { email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return ResponseError("Email already exists!", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await User.create({ email, password: hashedPassword });

  return ResponseJson({
    success: true,
    message: "Account created successfully",
    user: { id: newUser._id, email: newUser.email },
  });
});
