require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Ensure the User model is correctly defined

const MONGODB_URI = process.env.MONGODB_URI;

const adminData = {
  username: 'superadmin', // Change as needed
  email: 'admin@gmail.com', // Change as needed
  password: 'maintain' // Change as needed
};

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected...');
    
    // Check if the admin user already exists
    let user = await User.findOne({ email: adminData.email });
    if (user) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Hash the password and create the admin user
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    const newUser = new User({
      username: adminData.username,
      email: adminData.email,
      password: hashedPassword
    });

    await newUser.save();
    console.log('Admin user created successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });
