import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  img: {
    type: String,
    required: false,
  },
  resume: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: false,
  },
  isSeller: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  // Email verification fields
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationOTP: {
    type: String,
    required: false
  },
  emailVerificationExpires: {
    type: Date,
    required: false
  },
  // Password reset fields
  passwordResetToken: {
    type: String,
    required: false
  },
  passwordResetExpires: {
    type: Date,
    required: false
  },
  // Password history tracking
  previousPasswords: [{
    password: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  passwordCreated: {
    type: Date,
    default: Date.now
  },
  passwordExpiresAt: {
    type: Date,
    required: false
  },
  // Account security fields
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date,
    required: false
  },
  lastLogin: {
    type: Date,
    required: false
  },
  // Session management
  activeSessions: [{
    token: String,
    device: String,
    ip: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Two-factor authentication
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: {
    type: String,
    required: false
  },
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  lastPasswordChange: {
    type: Date,
    default: Date.now
  },
  // Security preferences
  requirePasswordChange: {
    type: Boolean,
    default: false
  },
  passwordChangeReason: {
    type: String,
    enum: ['admin_required', 'security_breach', 'user_requested', 'expired'],
    required: false
  }
}, {
  timestamps: true
});

// Index for better performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ emailVerificationExpires: 1 }, { expireAfterSeconds: 0 });
userSchema.index({ passwordResetExpires: 1 }, { expireAfterSeconds: 0 });

// Virtual for checking if account is locked
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Virtual for checking if password is expired
userSchema.virtual('isPasswordExpired').get(function() {
  if (!this.passwordExpiresAt) return false;
  return this.passwordExpiresAt < new Date();
});

// Method to increment login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 };
  }
  
  return this.updateOne(updates);
};

// Method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

// Method to add active session
userSchema.methods.addSession = function(token, device, ip) {
  return this.updateOne({
    $push: {
      activeSessions: {
        token,
        device,
        ip,
        createdAt: new Date()
      }
    }
  });
};

// Method to remove session
userSchema.methods.removeSession = function(token) {
  return this.updateOne({
    $pull: {
      activeSessions: { token }
    }
  });
};

// Method to clear all sessions
userSchema.methods.clearAllSessions = function() {
  return this.updateOne({
    $set: { activeSessions: [] }
  });
};

// Method to add password to history
userSchema.methods.addPasswordToHistory = function(hashedPassword) {
  return this.updateOne({
    $push: {
      previousPasswords: {
        password: hashedPassword,
        createdAt: new Date()
      }
    },
    $set: {
      lastPasswordChange: new Date(),
      passwordCreated: new Date()
    }
  });
};

// Method to check if password was previously used
userSchema.methods.isPasswordReused = async function(newPassword) {
  const bcrypt = require('bcrypt');
  
  for (const prevPassword of this.previousPasswords) {
    const isMatch = await bcrypt.compare(newPassword, prevPassword.password);
    if (isMatch) {
      return true;
    }
  }
  
  return false;
};

// Method to update password with history
userSchema.methods.updatePassword = async function(newHashedPassword) {
  // Keep only last 5 passwords in history
  const updatedHistory = this.previousPasswords.slice(-4);
  updatedHistory.push({
    password: this.password,
    createdAt: this.passwordCreated
  });
  
  return this.updateOne({
    $set: {
      password: newHashedPassword,
      previousPasswords: updatedHistory,
      lastPasswordChange: new Date(),
      passwordCreated: new Date(),
      requirePasswordChange: false,
      passwordChangeReason: null
    }
  });
};

// Pre-save middleware to hash password if modified
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const bcrypt = require('bcrypt');
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordCreated = new Date();
  }
  next();
});

export default mongoose.model("User", userSchema);