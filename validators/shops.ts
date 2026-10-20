import { z } from "zod";

import { DAYS_OF_WEEK } from "@/lib/constants";

const dayScheduleSchema = z.object({
  day: z.enum(DAYS_OF_WEEK),
  isClosed: z.boolean(),
  open: z.string(),
  close: z.string(),
});

export const shopSchema = z.object({
  shopName: z.string().min(3, "Shop Name is required."),
  description: z.string().min(3).optional(),
  category: z.string().min(3, "Category is required"),
  contactNumber: z
    .string()
    .regex(/^\d{10}$/, "Please enter a valid 10 digit phone number"),
  address: z.object({
    fullAddress: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(3, "State is required"),
    pinCode: z
      .string()
      .min(1, "Pincode is required") // 1. Triggers if empty
      .length(6, "Pincode must be exactly 6 digits"),
  }),
  isDeliveryAvailable: z.boolean().optional(),
  openingHours: z.object({
    is24x7: z.boolean(),
    schedule: z.array(dayScheduleSchema).optional(),
  }).refine(
    (data) => {
      const is24x7Active = data.is24x7 === true;
      const hasValidSchedule = Array.isArray(data.schedule) && data.schedule.length > 0;
      return (is24x7Active && !hasValidSchedule) || (!is24x7Active && hasValidSchedule);
    },
    {
      message: "You must provide either 24/7 access OR a specific open/close schedule, but not both or neither."
    }
  ),
  images: z.array(z.string()).optional()
});

export type ShopFormValues = z.infer<typeof shopSchema>;
