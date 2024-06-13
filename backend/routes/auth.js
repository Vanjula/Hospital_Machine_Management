const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the User model is correctly defined in ../models/User
require('dotenv').config();

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Received signup request:', req.body);

  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    user = await User.findOne({ username });
    if (user) {
      console.log('User already exists with username:', username);
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    
    await newUser.save();
    console.log('User created successfully:', newUser);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Server error during signup:', error.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request:', req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Invalid credentials - no user found with email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials - password mismatch for email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful, token generated:', token);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Server error during login:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
