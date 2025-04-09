import React, { useState } from "react";
import "./Forgot.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("❌ Please enter a valid email address.");
      setMessage("");
      return;
    }

    // Simulate password reset process
    setMessage("✅ Password reset link sent to your email.");
    setError("");
    setEmail("");

    // You can trigger actual backend request here
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2 className="forgot-heading">Forgot Password</h2>

        {error && <div className="forgot-error">{error}</div>}
        {message && <div className="forgot-success">{message}</div>}

        <form onSubmit={handleSubmit} className="forgot-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setMessage("");
              }}
              required
            />
          </div>

          <button type="submit" className="forgot-btn">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
