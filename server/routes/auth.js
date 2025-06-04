const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes for user registration and login
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private route for getting user profile, protected by JWT middleware
router.get('/profile', protect, getUserProfile);

module.exports = router;
