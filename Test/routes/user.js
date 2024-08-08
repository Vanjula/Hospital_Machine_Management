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

router.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000 
    }
}));

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}


router.post('/register', async function(req, res) {
    try {
        const { name, email, username, password, phoneNumber,confirm_password } = req.body;

        if (password !== confirm_password) {
            return res.status(200).json({ error: 'Passwords do not match' });
        }

        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(200).json({ error: 'Username already exists, choose another' });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            username: username,
            password: hash,
            phoneNumber:phoneNumber,
            admin: 0
        });
        await newUser.save();

        await mailer(email, 'reg', 'On behalf of the entire team, it is my great pleasure to welcome you to our organization. We are delighted to have you join us and are excited about the wealth of experience, knowledge, and enthusiasm you bring. Our organization is dedicated to [mission/goal], and every new member plays a crucial role in helping us achieve our objectives. We believe that with your unique skills and perspectives, we can continue to innovate and excel in our field. We have a dynamic and supportive team that is always ready to assist you in getting settled and finding your way. Our culture is one of collaboration, continuous learning, and growth. We encourage you to take full advantage of the resources available and to engage actively with your colleagues. During the onboarding process, you will be introduced to various aspects of our operations, values, and vision. We aim to provide you with all the tools and information you need to succeed and feel at home here. If you have any questions or need assistance at any point, please do not hesitate to reach out to your supervisor, the HR team, or any of our friendly staff members. We are all here to help you thrive. Thank you for choosing to be a part of our team. We are confident that your contributions will help us reach new heights and achieve our collective goals. Welcome aboard, and we look forward to a successful journey together! Warm regards,');
       
        res.json({ success: 'You will receive an email notification.' });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.status(500).json({ error: 'Error authenticating user' });
        }
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({ error: 'Error logging in user' });
            }
            
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
            return res.json({ message: 'Login successful',user: req.user, token: token });
        });
    })(req, res, next);
});

router.get('/logout', async function(req, res) {
    try {
        const decoded = jwt.verify(req.headers.authorization, JWT_SECRET);; 
        console.log(decoded)
        const userId = decoded.userId 
        if (!userId) {
            return res.status(401).json({ error: 'You are not logged in' });
        }

        req.logout(function(err) {
            if (err) {
                console.error('Error logging out:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            req.session.destroy(function(err) {
                if (err) {
                    console.error('Error destroying session:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                res.json({ message: 'You are logged out!' });
            });
        });
    } catch (error) {
        console.log(typeof(error));
        console.log(error.name);
        if(error.name === 'TokenExpiredError'){
            res.status(200).json({ message: 'Token Expired' });
        } else {
            console.error('Error rendering login page:', error);
            res.status(500).json({ error: error });
        }       
    }
});

// // Route to initiate password reset
// router.post('/forgot-password', async (req, res) => {
//     try {
//         const { email } = req.body;
//         const user = await User.findOne({ email: email });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         const OTP = generateOTP();
//         await mailer(email, 'Password Reset OTP', `Your OTP for password reset is: ${OTP}`, `Your OTP for password reset is: <b>${OTP}</b>`);
//         const token = jwt.sign({ email, OTP }, JWT_SECRET, { expiresIn: '15m' });
//         res.json({ token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error sending email' });
//     }
// });

router.get('/get-user',(req,res)=>{
    const user=req.user
    res.json({ user });
})

// // Route to reset password
// router.post('/reset-password', async (req, res) => {
//     try {
//         const { token, OTP, newPassword } = req.body;
//         const decoded = jwt.verify(token, JWT_SECRET);
//         if (decoded.OTP !== parseInt(OTP)) {
//             return res.status(400).json({ error: 'Invalid OTP' });
//         }
//         const user = await User.findOne({ email: decoded.email });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(newPassword, salt);
//         user.password = hash;
//         await user.save();
//         return res.json({ message: 'Password reset successfully. Please log in again.' });
//     } catch (error) {
//         console.error(error);
//         if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
//             return res.status(401).json({ error: 'Invalid or expired token' });
//         } else {
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//     }
// });


// Route to initiate password reset
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const OTP = generateOTP();
        // Generate OTP and send it to the user's email
        await mailer(email, 'Password Reset OTP', `Your OTP for password reset is: ${OTP}`, `Your OTP for password reset is: <b>${OTP}</b>`);

        // Generate JWT token with email and OTP
        const token = jwt.sign({ email, OTP }, JWT_SECRET, { expiresIn: '15m' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending email' });
    }
});

router.get('/get-user',(req,res)=>{
    const user=req.user
    res.json({ user });
})

router.post('/verify-otp', authenticate, async (req, res) => {
    try {
        const { OTP } = req.body;

        if (req.OTP !== parseInt(OTP)) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        const user = await User.findOne({ email: req.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'OTP verified. You can now reset your password.' });
    } catch (error) {
        console.error(error);
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
// Route to reset password
router.post('/reset-password', authenticate, async (req, res) => {
    try {
        const { newPassword } = req.body;
        const user = await User.findOne({ email: req.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        user.password = hash;
        await user.save();
        res.json({ message: 'Password reset successfully. Please log in again.' });
    } catch (error) {
        console.error(error);
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

//change password

module.exports = router;
