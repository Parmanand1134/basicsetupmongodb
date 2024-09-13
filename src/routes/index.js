const express = require('express');
const authRoutes = require('./authRoutes');
const uploadRoutes = require('./uploadRoutes');

const router = express.Router();

// Use the auth routes
router.use('/auth', authRoutes);
router.use('/uploads', uploadRoutes);


module.exports = router;
