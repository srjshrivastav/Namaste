export const validatePhone = (phone) => /^\d{10}$/.test(phone);
export const validatePassword = (password) => password.length >= 6;