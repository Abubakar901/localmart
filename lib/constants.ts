
// application constants
export const mongoURL = process.env.MONGO_URL;

// cloudinary constant for images
export const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
export const cloudApiKey =  process.env.CLOUDINARY_API_KEY;
export const cloudApiSecret = process.env.CLOUDINARY_API_SECRET;

// roles constants
export const ROLES = ["customer", "admin", "seller"];
export type Role = typeof ROLES[number];

export const PASSWORD_RULES = {
  minLength: 8,
  hasUpper: /[A-Z]/,
  hasNumber: /\d/,
};

export const baseAddressFields = {
    fullAddress: { type: String, required: true },
    city: { type: String, required: true  },
    state: { type: String, required: true },
    pinCode: { type: String, required: true  },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
};

export const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
