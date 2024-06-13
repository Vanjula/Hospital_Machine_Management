const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin user by email
    const adminUser = await User.findOne({ email });
    if (!adminUser) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: adminUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });

  } catch (error) {
    console.error('Server error during login:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
