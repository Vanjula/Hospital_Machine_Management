import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const { username, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      console.log('Submitting signup form data:', formData);
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      console.log('Signup response from server:', res.data);
      // Handle success (e.g., redirect to login page)
    } catch (err) {
      console.error('Error during signup request:', err);
      if (err.response) {
        console.error('Signup error response data:', err.response.data);
        if (err.response.data.message === 'User already exists') {
          setError('A user with this email or username already exists.');
        } else {
          setError(err.response.data.message || 'An error occurred. Please try again later.');
        }
      } else if (err.request) {
        console.error('No response received from server:', err.request);
        setError('No response received from the server. Please try again later.');
      } else {
        console.error('Signup request error:', err.message);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="username" value={username} onChange={onChange} required />
      <input type="email" name="email" value={email} onChange={onChange} required />
      <input type="password" name="password" value={password} onChange={onChange} required />
      <button type="submit">Sign Up</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Signup;
