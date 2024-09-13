const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const messages = require('../utils/message');

// @desc Register new user
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).send({ message: messages.USER_ALREADY_EXISTS });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).send({
            status: messages.OK,
            data: user,
            message: messages.SIGNUP_SUCCESS_MESSAGE,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: messages.SOMETHING_WENT_WRONG });
    }
};

// @desc Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            // User not found
            return res.status(404).send({ message: messages.USER_NOT_FOUND });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            // Invalid credentials
            return res.status(401).send({ message: messages.INVALID_CREDENTIALS });
        }

        // Generate token
        const token = generateToken(user._id);

        // Respond with user data and token
        res.status(200).send({
            status: messages.OK,
            data: user,
            message: messages.LOGIN_SUCCESS_MESSAGE,
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: messages.SOMETHING_WENT_WRONG });
    }
};



// @desc Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            res.status(404).send({ message: messages.USER_NOT_FOUND });
        }

        res.send({
            status: messages.OK,
            data: user,
            message: messages.SUCCESS,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: messages.SOMETHING_WENT_WRONG });
    }
};

// @desc Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);


        if (!user) {
            res.status(404).send({ message: messages.USER_NOT_FOUND });
        }


        user.name = req.body.name || user.name;
        const updatedUser = await user.save();

        res.send({
            data: updatedUser,
            message: messages.UPDATE_SUCCESS_MESSAGE,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: messages.SOMETHING_WENT_WRONG });
    }
};
