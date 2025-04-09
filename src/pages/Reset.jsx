// ResetPasswordPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const ResetPasswordPage = () => {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (form.password.length < 8) {
      errs.password = "Password must be at least 8 characters.";
    }
    if (!/[A-Z]/.test(form.password)) {
      errs.password = "Password must include at least one uppercase letter.";
    }
    if (!/[0-9]/.test(form.password)) {
      errs.password = "Password must include at least one number.";
    }
    if (form.password !== form.confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setMessage("Password reset successfully!");
    // Simulate redirect
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="reset-container">
      <h2 className="reset-heading">Reset Password</h2>
      {message && <div className="reset-success">{message}</div>}
      <form className="reset-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <div className="error-text">{errors.password}</div>
          )}
        </div>
        <div className="input-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <div className="error-text">{errors.confirmPassword}</div>
          )}
        </div>
        <button type="submit" className="reset-btn">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
