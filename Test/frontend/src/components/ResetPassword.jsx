import React, { useState } from "react";
import axios from "axios";
import "../assets/resetPassword.css"; // Create this CSS file for styling
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { token } = location.state || {};

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          token,
          OTP: otp,
          newPassword,
        }
      );
      setMessage(
        res.data.message || "Password reset successfully. Please log in again."
      );
      setError("");
      setTimeout(() => navigate("/Auth"), 3000); // Redirect to login after 3 seconds
    } catch (err) {
      setError(
        err.response?.data.error || "An error occurred. Please try again later."
      );
      setMessage("");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="otp">OTP</label>
        <input
          type="text"
          id="otp"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>
        {message && <p className="message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
