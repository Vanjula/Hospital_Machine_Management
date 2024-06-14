import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../assets/login.css"; // Make sure this path is correct based on your folder structure

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      console.log("Login response from server:", res.data);
      const token = res.data.token;

      localStorage.setItem("Authorization", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      alert("Successfully logged in!");
      setError("");

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data.error || "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
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
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default Login;
