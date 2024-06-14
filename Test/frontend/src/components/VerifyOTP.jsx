import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/verifyOTP.css";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState(localStorage.getItem("resetToken") || "");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { OTP: otp, token }
      );
      alert(res.data.message);
      localStorage.setItem("resetToken", token);
      navigate("/reset-password");
      setError("");
    } catch (err) {
      console.error("Verify OTP error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="verify-otp-container">
      <h2>Verify OTP</h2>
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
        <button type="submit">Verify OTP</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default VerifyOTP;
