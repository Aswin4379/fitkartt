/**
 * FitKart Indian Mobile Number Sanitizer and Validator
 * Validates 10-digit Indian numbers starting with 6, 7, 8, or 9
 */

export const sanitizeIndianPhone = (raw) => {
  if (!raw) return '';
  const digits = String(raw).replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return digits.slice(-10);
};

export const isValidIndianPhone = (phone) => {
  if (!phone) return false;
  return /^[6-9]\d{9}$/.test(phone);
};

export const formatIndianPhone = (phone) => {
  if (!phone) return '';
  const clean = sanitizeIndianPhone(phone);
  if (clean.length !== 10) return clean;
  return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
};
