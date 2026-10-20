import toast from "react-hot-toast"

export const validateEmail = (isValidEmail: boolean): boolean => {
  if (!isValidEmail) {
    toast.error("Please enter a valid email address")
    return false
  }
  return true
}

export const validatePassword = (password: string): boolean => {
  if (password.length === 0) {
    toast.error("Please enter your password")
    return false
  }
  if (password.length < 8) {
    toast.error("Password must be at least 8 characters")
    return false
  }
  return true
}

export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  if (password !== confirmPassword) {
    toast.error("Passwords do not match")
    return false
  }
  return true
}