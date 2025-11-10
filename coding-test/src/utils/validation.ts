const emailRegex = /^[\w.!#$%&'*+/=?^_`{|}~-]+@[\w-]+(\.[\w-]+)+$/i;
const phoneRegex = /^\+?[0-9\s()-]{7,}$/;
const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/i;

export function isEmail(value: string): boolean {
  return emailRegex.test(value.trim());
}

export function isPhoneNumber(value: string): boolean {
  return phoneRegex.test(value.trim());
}

export function isUrl(value: string): boolean {
  return urlRegex.test(value.trim());
}

export function isNumeric(value: string | number): boolean {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  return value.trim() !== '' && !Number.isNaN(Number(value));
}

export function isEmpty(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

export function hasMinLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}

export function hasMaxLength(value: string, max: number): boolean {
  return value.trim().length <= max;
}

export function validateRequiredFields<T extends Record<string, unknown>>(
  values: T,
  requiredKeys: Array<keyof T>
): Array<keyof T> {
  return requiredKeys.filter((key) => isEmpty(values[key]));
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long.');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must include an uppercase letter.');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must include a lowercase letter.');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must include a number.');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must include a special character.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
