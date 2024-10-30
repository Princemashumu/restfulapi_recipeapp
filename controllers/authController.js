// controllers/authController.js
const User = require('../models/user'); // Make sure the path to your User model is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input data
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Set default role as "user"
        const role = 'user';

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role, // Add the role field here
        });

        await newUser.save();

        // Generate a JWT token with role included
        const token = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error(error); // Log the actual error to the console
        res.status(500).json({ message: 'Server error' });
    }
};
