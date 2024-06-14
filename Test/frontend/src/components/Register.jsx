import React, { useState } from "react";
import axios from "axios";
import "../assets/register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    phoneNumber: "",
  });

  const [error, setError] = useState("");

  const { name, email, username, password, confirm_password, phoneNumber } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      alert(res.data.success || res.data.error);
      setError("");
      if (res.data.success) {
        window.location.href = "/Auth";
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={onChange}
          required
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <label htmlFor="confirm_password">Confirm Password</label>
        <input
          type="password"
          id="confirm_password"
          name="confirm_password"
          value={confirm_password}
          onChange={onChange}
          required
        />
        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
