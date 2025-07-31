import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail, generateOTP } from "../services/emailService.js";
import { validatePassword, hashPassword, verifyPassword, checkPreviousPasswords } from "../utils/passwordValidator.js";
import crypto from "crypto";

export const register = async (req, res, next) => {
  try {
    const { username, email, password, country, phone, desc, isSeller } = req.body;

    // Validate password complexity
    const passwordValidation = validatePassword(password, username);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        error: "Password validation failed",
        details: passwordValidation.errors,
        strength: passwordValidation.strength
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User with this email or username already exists!"
      });
    }

    // Generate OTP for email verification
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Hash password with enhanced security
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      country,
      phone,
      desc,
      isSeller: isSeller || false,
      emailVerificationOTP: otp,
      emailVerificationExpires: otpExpires,
      passwordCreated: new Date()
    });

    await newUser.save();

    // Send verification email
    const emailSent = await sendVerificationEmail(email, otp, username);
    
    if (!emailSent) {
      return res.status(500).json({
        error: "Failed to send verification email. Please try again."
      });
    }

    res.status(201).json({
      message: "User has been created. Please check your email for verification.",
      userId: newUser._id,
      passwordStrength: passwordValidation.strength
    });
  } catch (err) {
    console.log("Error in User creation process:", err);
    next(err);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: "User not found!"
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        error: "Email is already verified!"
      });
    }

    if (user.emailVerificationOTP !== otp) {
      return res.status(400).json({
        error: "Invalid OTP!"
      });
    }

    if (user.emailVerificationExpires < new Date()) {
      return res.status(400).json({
        error: "OTP has expired! Please request a new one."
      });
    }

    // Verify email
    user.isEmailVerified = true;
    user.emailVerificationOTP = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    // Send welcome email
    await sendWelcomeEmail(email, user.username);

    res.status(200).json({
      message: "Email verified successfully! Welcome to our platform."
    });
  } catch (err) {
    console.log("Error in email verification:", err);
    next(err);
  }
};

export const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: "User not found!"
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        error: "Email is already verified!"
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.emailVerificationOTP = otp;
    user.emailVerificationExpires = otpExpires;
    await user.save();

    // Send new verification email
    const emailSent = await sendVerificationEmail(email, otp, user.username);
    
    if (!emailSent) {
      return res.status(500).json({
        error: "Failed to send verification email. Please try again."
      });
    }

    res.status(200).json({
      message: "Verification email sent successfully!"
    });
  } catch (err) {
    console.log("Error in resending verification email:", err);
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        error: "User not found!"
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        error: "Account is temporarily locked due to too many failed attempts. Please try again later."
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({
        error: "Account is deactivated. Please contact support."
      });
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return res.status(403).json({
        error: "Please verify your email address before logging in."
      });
    }

    // Check if password is expired
    if (user.isPasswordExpired) {
      return res.status(403).json({
        error: "Password has expired. Please reset your password.",
        requirePasswordChange: true
      });
    }

    // Check if password change is required
    if (user.requirePasswordChange) {
      return res.status(403).json({
        error: "Password change required for security reasons.",
        requirePasswordChange: true,
        reason: user.passwordChangeReason
      });
    }

    const isCorrect = await verifyPassword(password, user.password);

    if (!isCorrect) {
      // Increment login attempts
      await user.incLoginAttempts();
      return res.status(400).json({
        error: "Wrong password or username!"
      });
    }

    // Reset login attempts on successful login
    await user.resetLoginAttempts();

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token with enhanced security
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
        isAdmin: user.isAdmin,
        sessionId: crypto.randomBytes(32).toString('hex')
      },
      process.env.JWT_KEY,
      { 
        expiresIn: '24h',
        issuer: 'freelancing-platform',
        audience: 'freelancing-users'
      }
    );

    // Add session
    const device = req.headers['user-agent'] || 'Unknown';
    const ip = req.ip || req.connection.remoteAddress;
    await user.addSession(token, device, ip);

    const { password: userPassword, ...info } = user._doc;

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }).status(200).json(info);

  } catch (err) {
    console.log("Error in Login Process:", err);
    next(err);
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    
    if (token && req.userId) {
      // Remove session from user's active sessions
      await User.findByIdAndUpdate(req.userId, {
        $pull: { activeSessions: { token } }
      });
    }

    res.clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    }).status(200).json({
      message: "User has been logged out."
    });
  } catch (err) {
    console.log("Error in logout:", err);
    res.status(500).json({
      error: "Error during logout."
    });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "User not found!"
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetExpires;
    await user.save();

    // Send password reset email
    const emailSent = await sendPasswordResetEmail(email, resetToken, user.username);
    
    if (!emailSent) {
      return res.status(500).json({
        error: "Failed to send password reset email. Please try again."
      });
    }

    res.status(200).json({
      message: "Password reset email sent successfully!"
    });
  } catch (err) {
    console.log("Error in forgot password:", err);
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        error: "Invalid or expired reset token!"
      });
    }

    // Validate new password
    const passwordValidation = validatePassword(newPassword, user.username);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        error: "Password validation failed",
        details: passwordValidation.errors,
        strength: passwordValidation.strength
      });
    }

    // Check if password was previously used
    const isReused = await user.isPasswordReused(newPassword);
    if (isReused) {
      return res.status(400).json({
        error: "Password was previously used. Please choose a different password."
      });
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password and clear reset token
    await user.updatePassword(hashedPassword);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      message: "Password reset successfully!"
    });
  } catch (err) {
    console.log("Error in reset password:", err);
    next(err);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found!"
      });
    }

    // Verify current password
    const isCorrect = await verifyPassword(currentPassword, user.password);
    if (!isCorrect) {
      return res.status(400).json({
        error: "Current password is incorrect!"
      });
    }

    // Validate new password
    const passwordValidation = validatePassword(newPassword, user.username);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        error: "Password validation failed",
        details: passwordValidation.errors,
        strength: passwordValidation.strength
      });
    }

    // Check if new password is same as current
    if (currentPassword === newPassword) {
      return res.status(400).json({
        error: "New password must be different from current password."
      });
    }

    // Check if password was previously used
    const isReused = await user.isPasswordReused(newPassword);
    if (isReused) {
      return res.status(400).json({
        error: "Password was previously used. Please choose a different password."
      });
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await user.updatePassword(hashedPassword);

    res.status(200).json({
      message: "Password changed successfully!"
    });
  } catch (err) {
    console.log("Error in change password:", err);
    next(err);
  }
};

export const getActiveSessions = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found!"
      });
    }

    res.status(200).json({
      sessions: user.activeSessions
    });
  } catch (err) {
    console.log("Error in getting active sessions:", err);
    next(err);
  }
};

export const revokeSession = async (req, res, next) => {
  try {
    const { token } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found!"
      });
    }

    await user.removeSession(token);

    res.status(200).json({
      message: "Session revoked successfully!"
    });
  } catch (err) {
    console.log("Error in revoking session:", err);
    next(err);
  }
};

export const revokeAllSessions = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found!"
      });
    }

    await user.clearAllSessions();

    res.status(200).json({
      message: "All sessions revoked successfully!"
    });
  } catch (err) {
    console.log("Error in revoking all sessions:", err);
    next(err);
  }
};

// Get password policy for frontend
export const getPasswordPolicy = async (req, res) => {
  try {
    const { getPasswordPolicyDescription } = await import('../utils/passwordValidator.js');
    const policy = getPasswordPolicyDescription();
    
    res.status(200).json(policy);
  } catch (err) {
    console.log("Error in getting password policy:", err);
    next(err);
  }
};
