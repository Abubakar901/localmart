import crypto from "node:crypto";
import nodemailer from "nodemailer";

import { connectDB } from "@/lib/database";
import { User } from "@/models/User";
import { forgotPasswordSchema } from "@/validators/auth";
import { validateRequest } from "@/lib/validateRequest";
import { withErrorHandler } from "@/lib/errorHandler";
import { ResponseJson } from "@/lib/responseHandler";

export const POST = withErrorHandler(async (req: Request) => {
  await connectDB();

  const body = await req.json();
  const { data, error } = await validateRequest(forgotPasswordSchema, body);
  if (error) return error;

  const { email } = data;

  const user = await User.findOne({ email });

  const genericSuccess = ResponseJson({
    success: true,
    message: "If an account exists for this email, a reset link has been sent.",
  });

  if (!user) {
    return genericSuccess;
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 30); // 30 min
  await user.save();

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;

  
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT), // ✅ port must be a number, not a string
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const mailOptions = {
  from: process.env.SMTP_MAIL,
  to: email,
  subject: "LocalMart Password Recovery",
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
      <h2>Password Reset Request</h2>
      <p>Click the button below to reset your password. This link expires in 15 minutes.</p>
      
      <!-- Bulletproof Button -->
      <table border="0" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
  <tr>
    <td align="center" bgcolor="#009933" style="border-radius: 6px;"> 
      <a href="${resetUrl}" style="display: inline-block; padding: 14px 28px; color: #ffffff; text-decoration: none; font-weight: bold; font-family: sans-serif;">
        Reset Password
      </a>
    </td>
  </tr>
</table>
      
      <p style="margin-top: 30px; font-size: 12px; color: #888;">
        If you did not request this, please ignore this email.
      </p>
    </div>
  `,
};

 await transporter.sendMail(mailOptions);

  return genericSuccess;
});
