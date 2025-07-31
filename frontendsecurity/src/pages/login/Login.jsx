import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await newRequest.post("/auth/login", { username, password });
      console.log(res);
      
      if (res.status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Login failed. Please try again.";
      setError(errorMessage);
      
      // Handle specific error cases
      if (err.response?.status === 423) {
        setError("Account is temporarily locked due to too many failed attempts. Please try again later.");
      } else if (err.response?.status === 403) {
        if (err.response?.data?.requirePasswordChange) {
          setError("Password change required. Please reset your password.");
        } else {
          setError("Please verify your email address before logging in.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotPasswordMessage("");
    setIsLoading(true);

    try {
      const res = await newRequest.post("/auth/forgot-password", {
        email: forgotPasswordEmail
      });

      if (res.status === 200) {
        setForgotPasswordMessage("Password reset email sent successfully! Please check your email.");
        setShowForgotPassword(false);
      }
    } catch (err) {
      setForgotPasswordMessage(err.response?.data?.error || "Failed to send password reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="login">
        <form onSubmit={handleForgotPassword}>
          <h1>Forgot Password</h1>
          <p>Enter your email address and we'll send you a password reset link.</p>
          
          <label htmlFor="email">Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <button 
            type="button" 
            onClick={() => setShowForgotPassword(false)}
            className="back-button"
          >
            Back to Login
          </button>

          {forgotPasswordMessage && (
            <div className={forgotPasswordMessage.includes("successfully") ? "success" : "error"}>
              {forgotPasswordMessage}
            </div>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Login"}
        </button>

        <div className="forgot-password">
          <button 
            type="button" 
            onClick={() => setShowForgotPassword(true)}
            className="forgot-password-link"
          >
            Forgot Password?
          </button>
        </div>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
