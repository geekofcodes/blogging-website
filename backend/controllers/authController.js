const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const {handleSuccess, handleError} = require('../utils/responseHandlers')

// Register a new user
exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return handleError(res, 'Missing required fields', 400);
    }

    try {
        // Check if username exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return handleError(res, 'Username already exists', 400);
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });

        await newUser.save();
        return handleSuccess(res, 'User registered successfully', 201);
    } catch (error) {
        return handleError(res, error.message, 500);
    }
};

// Login user
exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return handleError(res, 'Missing required fields', 400);
    }

    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return handleError(res, 'Invalid username or password', 401);
        }

        // Add user session or generate a token
        req.session.user_id = user._id;
        return handleSuccess(res, 'Login successful', 200);
    } catch (error) {
        return handleError(res, error.message, 500);
    }
};
