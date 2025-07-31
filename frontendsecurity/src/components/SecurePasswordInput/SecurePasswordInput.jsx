import React, { useState, useEffect } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import zxcvbn from 'zxcvbn';
import './SecurePasswordInput.scss';

const SecurePasswordInput = ({ 
  value, 
  onChange, 
  onValidationChange, 
  username = '', 
  placeholder = "Enter password",
  showStrengthBar = true,
  className = ''
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [strength, setStrength] = useState(0);

  // Password validation rules
  const validatePassword = (password) => {
    const errors = [];
    
    // Length check
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (password.length > 16) {
      errors.push('Password must be no more than 16 characters long');
    }
    
    // Character variety checks
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
      errors.push('Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)');
    }
    
    // Username check
    if (username && password.toLowerCase().includes(username.toLowerCase())) {
      errors.push('Password cannot contain your username');
    }
    
    // Common password check
    const commonPasswords = [
      'password', '123456', '123456789', 'qwerty', 'abc123', 
      'password123', 'admin', 'letmein', 'welcome', 'monkey'
    ];
    if (commonPasswords.includes(password.toLowerCase())) {
      errors.push('Password is too common. Please choose a stronger password');
    }
    
    return errors;
  };

  // Calculate password strength using zxcvbn
  const calculateStrength = (password) => {
    if (!password) return 0;
    
    const result = zxcvbn(password, [username]);
    return Math.min(result.score * 20, 100); // Convert 0-4 score to 0-100
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    onChange(e);
    
    // Validate password
    const errors = validatePassword(newPassword);
    setValidationErrors(errors);
    
    // Calculate strength
    const newStrength = calculateStrength(newPassword);
    setStrength(newStrength);
    
    // Notify parent component
    if (onValidationChange) {
      onValidationChange({
        isValid: errors.length === 0,
        errors,
        strength: newStrength
      });
    }
  };

  // Get strength label
  const getStrengthLabel = (strength) => {
    if (strength < 20) return 'Very Weak';
    if (strength < 40) return 'Weak';
    if (strength < 60) return 'Fair';
    if (strength < 80) return 'Good';
    return 'Strong';
  };

  // Get strength color
  const getStrengthColor = (strength) => {
    if (strength < 20) return '#ff4444';
    if (strength < 40) return '#ff8800';
    if (strength < 60) return '#ffaa00';
    if (strength < 80) return '#88cc00';
    return '#00cc00';
  };

  return (
    <div className={`secure-password-input ${className}`}>
      <div className="password-field">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={handlePasswordChange}
          placeholder={placeholder}
          className={`password-input ${validationErrors.length > 0 ? 'error' : ''}`}
        />
        <button
          type="button"
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </button>
      </div>
      
      {showStrengthBar && value && (
        <div className="strength-indicator">
          <div className="strength-bar">
            <div 
              className="strength-fill"
              style={{ 
                width: `${strength}%`,
                backgroundColor: getStrengthColor(strength)
              }}
            />
          </div>
          <span className="strength-label" style={{ color: getStrengthColor(strength) }}>
            {getStrengthLabel(strength)}
          </span>
        </div>
      )}
      
      {validationErrors.length > 0 && (
        <div className="validation-errors">
          {validationErrors.map((error, index) => (
            <div key={index} className="error-message">
              ❌ {error}
            </div>
          ))}
        </div>
      )}
      
      {value && validationErrors.length === 0 && (
        <div className="validation-success">
          ✅ Password meets all requirements
        </div>
      )}
      
      <div className="password-requirements">
        <h4>Password Requirements:</h4>
        <ul>
          <li className={value.length >= 8 && value.length <= 16 ? 'met' : 'unmet'}>
            Length: 8-16 characters
          </li>
          <li className={/[a-z]/.test(value) ? 'met' : 'unmet'}>
            At least one lowercase letter
          </li>
          <li className={/[A-Z]/.test(value) ? 'met' : 'unmet'}>
            At least one uppercase letter
          </li>
          <li className={/\d/.test(value) ? 'met' : 'unmet'}>
            At least one number
          </li>
          <li className={/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(value) ? 'met' : 'unmet'}>
            At least one special character
          </li>
          <li className={!username || !value.toLowerCase().includes(username.toLowerCase()) ? 'met' : 'unmet'}>
            Cannot contain username
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SecurePasswordInput; 