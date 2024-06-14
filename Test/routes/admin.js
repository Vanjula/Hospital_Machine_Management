const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user.js');
const mailer = require('../utils/mailer.js');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const authenticate = require('../utils/ForgetAuth.js');
const JWT_SECRET = 'SHY23FDA45G2G1K89KH5sec4H8KUTF85ret';
const Machine = require('../models/Machine.js');


function authenticateToken(req, res, next) {
    const token = req.headers['authorization']; 
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }
        req.userId = decoded.userId; // Set userId in the request object for later use
        next();
    });
}


router.post('/add', authenticateToken, async (req, res) => {
  // Ensure userId is properly extracted from request
  const userId = req.userId;

  // Check if userId is undefined or null
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Fetch the user from the database based on userId
    const user = await User.findById(userId);

    // Check if user exists and has the role 'superadmin'
    if (!user || user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    console.log(req.body);
    const machineData = { ...req.body };

    // Handle vault_approval_document and license_document file uploads
    if (req.files) {
      if (req.files['vault_approval_document']) {
        machineData.vault_approval_document = req.files['vault_approval_document'][0].buffer;
      } else {
        machineData.vault_approval_document = null; // or handle accordingly if needed
      }

      if (req.files['license_document']) {
        machineData.license_document = req.files['license_document'][0].buffer;
      } else {
        machineData.license_document = null; // or handle accordingly if needed
      }
    }

    // Log machineData to verify its structure before saving
    console.log('Machine Data:', machineData);

    // Create a new Machine instance with the combined data
    const machine = new Machine(machineData);

    // Save the machine instance to the database
    machine.save()
      .then(result => res.status(201).json({ message: "Success" }))
      .catch(error => {
        console.error('Error saving document:', error); // Log the detailed error
        res.status(500).json({ message: "Failed to add machine" });
      });

  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/machines', async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json(machines);
  } catch (error) {
    console.error('Error fetching machines:', error);
    res.status(500).json({ error: 'Failed to fetch machines' });
  }
});


//change password

module.exports = router;