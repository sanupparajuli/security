import express from "express";
import { 
  register, 
  login, 
  logout, 
  verifyEmail, 
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  getActiveSessions,
  revokeSession,
  revokeAllSessions,
  getPasswordPolicy
} from "../controllers/auth.controller.js";
import { 
  authRateLimiter, 
  sanitizeInput, 
  validateInput 
} from "../middleware/security.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// Get password policy (no authentication required)
router.get("/password-policy", getPasswordPolicy);

// Registration with validation and rate limiting
router.post("/register", 
  authRateLimiter,
  sanitizeInput,
  validateInput,
  register
);

// Login with validation and rate limiting
router.post("/login", 
  authRateLimiter,
  sanitizeInput,
  validateInput,
  login
);

// Email verification
router.post("/verify-email", 
  authRateLimiter,
  sanitizeInput,
  validateInput,
  verifyEmail
);

// Resend verification email
router.post("/resend-verification", 
  authRateLimiter,
  sanitizeInput,
  validateInput,
  resendVerificationEmail
);

// Forgot password
router.post("/forgot-password", 
  authRateLimiter,
  sanitizeInput,
  validateInput,
  forgotPassword
);

// Reset password
router.post("/reset-password", 
  authRateLimiter,
  sanitizeInput,
  validateInput,
  resetPassword
);

// Change password (requires authentication)
router.post("/change-password", 
  verifyToken,
  authRateLimiter,
  sanitizeInput,
  validateInput,
  changePassword
);

// Get active sessions (requires authentication)
router.get("/sessions", 
  verifyToken,
  getActiveSessions
);

// Revoke specific session (requires authentication)
router.post("/revoke-session", 
  verifyToken,
  revokeSession
);

// Revoke all sessions (requires authentication)
router.post("/revoke-all-sessions", 
  verifyToken,
  revokeAllSessions
);

// Logout
router.post("/logout", logout);

export default router;
