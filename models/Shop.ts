import { Schema, models, model } from "mongoose";

import { baseAddressFields, DAYS_OF_WEEK } from "@/lib/constants";

const shopAddressSchema = new Schema({
  ...baseAddressFields,
});

const dayScheduleSchema = new Schema(
  {
    day: {
      type: String,
      enum: DAYS_OF_WEEK,
      required: true,
    },
    isClosed: { type: Boolean, default: false },
    open: { type: String }, // "09:00"
    close: { type: String }, // "21:00"
  },
  { _id: false },
);

const shopSchema = new Schema(
  {
    seller: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    shopName: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid 10 digit phone contact number"],
    },
    address: { type: shopAddressSchema, required: true },
    isDeliveryAvailable: { type: Boolean, default: false },
    openingHours: {
      is24x7: { type: Boolean, default: false }, 
      schedule: {
        type: [dayScheduleSchema],
        default: () =>
          DAYS_OF_WEEK.map((day) => ({
            day,
            isClosed: false,
            open: "09:00",
            close: "21:00",
          })),
      },
    },
    images: [
      {
        public_id: { type: String },
        url: { type: String },
      },
    ],
    ratings: { type: Number, default: 0 },
    numOfReviews: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: Schema.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

shopSchema.index({ "address.coordinates": "2dsphere" });

export const Shop = models.Shop || model("Shop", shopSchema);
