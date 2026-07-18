import { Schema, model, models } from "mongoose";
import { ROLES } from "@/lib/constants";

const addressSchema = new Schema({
  label: { type: String, required: true },
  fullAddress: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  pinCode: { type: String },
  coordinates: {
    type: [Number],
  },
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
      sparse: true,
    },
    password:{ 
      type: String,
      required: [true, "Password is required"],
    },
    address: [addressSchema],
    phone: {
      type: String,
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid 10 digit phone number"],
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

export const User = models.User || model("User", userSchema);