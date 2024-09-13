const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/authController');
const { signupValidator, loginValidator } = require('../validators/authValidator');
const { protect } = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const router = express.Router();

// Register
router.post('/signup', signupValidator, validateRequest, registerUser);
router.post('/login', loginValidator, validateRequest, loginUser);




// Get user profile
router.get('/profile', protect, getUserProfile);

// Update profile
router.put('/profile', protect, updateUserProfile);

module.exports = router;
