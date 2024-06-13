import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      console.log('Submitting login form data:', formData);
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Login response from server:', res.data);
      setSuccess('Successfully logged in!');
      setError('');
      // Handle success (e.g., redirect to another page)
    } catch (err) {
      console.error('Error during login request:', err);
      if (err.response) {
        console.error('Login error response data:', err.response.data);
        setError(err.response.data.message || 'An error occurred. Please try again later.');
        setSuccess('');
      } else if (err.request) {
        console.error('No response received from server:', err.request);
        setError('No response received from the server. Please try again later.');
        setSuccess('');
      } else {
        console.error('Login request error:', err.message);
        setError('An error occurred. Please try again later.');
        setSuccess('');
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="email" name="email" value={email} onChange={onChange} required />
      <input type="password" name="password" value={password} onChange={onChange} required />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default Login;
