export const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const re = /^[0-9-]+$/;
  return re.test(phone);
};

export const validatePassword = (password: string): boolean => {
  if (password.length < 8) 
    return false;

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const count = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

  return count >= 3;
};
