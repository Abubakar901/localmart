import { Schema, model, models } from "mongoose";

import { baseAddressFields, ROLES } from "@/lib/constants";

const userAddressSchema = new Schema({
  ...baseAddressFields,
  label: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password:{ 
      type: String,
      required: [true, "Password is required"],
    },
    address: [userAddressSchema],
    contactNumber: {
      type: String,
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid 10 digit phone contact number"],
    },
    role: {
      type: String,
      enum: ROLES,
      default: "customer",
    },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  },
  { timestamps: true },
);

userAddressSchema.index({ coordinates: "2dsphere" });

export const User = models.User || model("User", userSchema);