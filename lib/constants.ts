
// application constants
export const mongoURL = process.env.MONGO_URL;

// roles constants
export const ROLES = ["customer", "admin", "seller"];
export type Role = typeof ROLES[number];

export const PASSWORD_RULES = {
  minLength: 8,
  hasUpper: /[A-Z]/,
  hasNumber: /\d/,
};