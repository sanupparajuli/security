import React, { useState } from "react";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import SecurePasswordInput from "../../components/SecurePasswordInput/SecurePasswordInput";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    phone: "",
    desc: "",
    isSeller: false
  });
  const [passwordValidation, setPasswordValidation] = useState({
    isValid: false,
    errors: [],
    strength: 0
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [verificationOTP, setVerificationOTP] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePasswordValidation = (validation) => {
    setPasswordValidation(validation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate password
    if (!passwordValidation.isValid) {
      setError("Please fix password validation errors before submitting.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await newRequest.post("/auth/register", formData);
      console.log(res);
      
      if (res.status === 201) {
        setShowEmailVerification(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await newRequest.post("/auth/verify-email", {
        email: formData.email,
        otp: verificationOTP
      });

      if (res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Email verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await newRequest.post("/auth/resend-verification", {
        email: formData.email
      });
      setError("Verification email sent successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend verification email.");
    } finally {
      setIsLoading(false);
    }
  };

  if (showEmailVerification) {
    return (
      <div className="register">
        <form onSubmit={handleEmailVerification}>
          <h1>Verify Your Email</h1>
          <p>We've sent a verification code to <strong>{formData.email}</strong></p>
          
          <label htmlFor="otp">Verification Code</label>
          <input
            name="otp"
            type="text"
            placeholder="Enter 6-digit code"
            value={verificationOTP}
            onChange={(e) => setVerificationOTP(e.target.value)}
            maxLength={6}
            required
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>

          <div className="resend-section">
            <p>Didn't receive the code?</p>
            <button 
              type="button" 
              onClick={handleResendOTP}
              disabled={isLoading}
              className="resend-button"
            >
              Resend Code
            </button>
          </div>

          {error && <div className="error">{error}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1>Create an Account</h1>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              placeholder="johndoe"
              value={formData.username}
              onChange={handleInputChange}
              required
              minLength={3}
              maxLength={30}
            />
          </div>
          <div className="form-col">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-col password-col">
            <label htmlFor="password">Password</label>
            <SecurePasswordInput
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              onValidationChange={handlePasswordValidation}
              username={formData.username}
              placeholder="Enter your password"
            />
          </div>
        </div>
        <label htmlFor="country">Country</label>
        <input
          name="country"
          type="text"
          placeholder="United States"
          value={formData.country}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="phone">Phone (Optional)</label>
        <input
          name="phone"
          type="tel"
          placeholder="+1-555-0123"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <label htmlFor="desc">Description (Optional)</label>
        <textarea
          name="desc"
          placeholder="Tell us about yourself..."
          value={formData.desc}
          onChange={handleInputChange}
          rows={3}
        />
        <div className="seller-option">
          <label htmlFor="isSeller">
            <input
              name="isSeller"
              type="checkbox"
              checked={formData.isSeller}
              onChange={handleInputChange}
            />
            I want to become a seller
          </label>
        </div>
        <button type="submit" disabled={isLoading || !passwordValidation.isValid}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Register;
