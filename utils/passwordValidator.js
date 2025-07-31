import bcrypt from 'bcrypt';

// Password complexity requirements
const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  maxLength: 16,
  requireLowercase: true,
  requireUppercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  preventUsernameMatch: true
};

// Special characters allowed
const SPECIAL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Password validation function
export const validatePassword = (password, username = '') => {
  const errors = [];

  // Check length
  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push(`Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long`);
  }
  if (password.length > PASSWORD_REQUIREMENTS.maxLength) {
    errors.push(`Password must be no more than ${PASSWORD_REQUIREMENTS.maxLength} characters long`);
  }

  // Check for lowercase letters
  if (PASSWORD_REQUIREMENTS.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  // Check for uppercase letters
  if (PASSWORD_REQUIREMENTS.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  // Check for numbers
  if (PASSWORD_REQUIREMENTS.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  // Check for special characters
  if (PASSWORD_REQUIREMENTS.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)');
  }

  // Check if password contains username
  if (PASSWORD_REQUIREMENTS.preventUsernameMatch && username && password.toLowerCase().includes(username.toLowerCase())) {
    errors.push('Password cannot contain your username');
  }

  // Check for common weak passwords
  const commonPasswords = [
    'password', '123456', '123456789', 'qwerty', 'abc123', 
    'password123', 'admin', 'letmein', 'welcome', 'monkey'
  ];
  
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Password is too common. Please choose a stronger password');
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength: calculatePasswordStrength(password)
  };
};

// Calculate password strength (0-100)
export const calculatePasswordStrength = (password) => {
  let strength = 0;

  // Length contribution (up to 25 points)
  strength += Math.min(password.length * 2, 25);

  // Character variety contribution (up to 50 points)
  let variety = 0;
  if (/[a-z]/.test(password)) variety += 1;
  if (/[A-Z]/.test(password)) variety += 1;
  if (/\d/.test(password)) variety += 1;
  if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) variety += 1;
  strength += variety * 12.5;

  // Complexity contribution (up to 25 points)
  const uniqueChars = new Set(password).size;
  strength += Math.min(uniqueChars * 2, 25);

  return Math.min(Math.round(strength), 100);
};

// Get password strength label
export const getPasswordStrengthLabel = (strength) => {
  if (strength < 30) return 'Very Weak';
  if (strength < 50) return 'Weak';
  if (strength < 70) return 'Fair';
  if (strength < 90) return 'Good';
  return 'Strong';
};

// Check if password was previously used
export const checkPreviousPasswords = async (newPassword, previousPasswords = []) => {
  if (!previousPasswords || previousPasswords.length === 0) {
    return { isReused: false };
  }

  for (const prevPassword of previousPasswords) {
    const isMatch = await bcrypt.compare(newPassword, prevPassword.password);
    if (isMatch) {
      return { 
        isReused: true, 
        reusedDate: prevPassword.createdAt 
      };
    }
  }

  return { isReused: false };
};

// Hash password with enhanced security
export const hashPassword = async (password) => {
  const saltRounds = 12; // Increased from default for better security
  return await bcrypt.hash(password, saltRounds);
};

// Verify password
export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate password history entry
export const createPasswordHistoryEntry = (hashedPassword) => {
  return {
    password: hashedPassword,
    createdAt: new Date()
  };
};

// Password policy description for frontend
export const getPasswordPolicyDescription = () => {
  return {
    requirements: PASSWORD_REQUIREMENTS,
    description: `Password must be ${PASSWORD_REQUIREMENTS.minLength}-${PASSWORD_REQUIREMENTS.maxLength} characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.`,
    specialChars: SPECIAL_CHARS
  };
}; 