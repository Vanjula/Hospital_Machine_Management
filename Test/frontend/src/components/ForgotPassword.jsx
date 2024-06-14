import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import "../assets/forgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );
      setMessage(res.data.message || "OTP sent to your email.");
      setError("");

      // Extract token from response
      const token = res.data.token;

      // Set token in Axios headers for all subsequent requests
      axios.defaults.headers.common["Authorization"] = `${token}`;

      // Move to reset password section
      navigate("/reset-password"); // Navigate to reset password section
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
        {message && <p className="message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
