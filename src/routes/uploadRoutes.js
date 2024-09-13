const express = require('express');
const upload = require('../config/multerConfig');
const path = require('path');
const router = express.Router();

// Upload image route
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json({
        message: 'File uploaded successfully',
        file: req.file,
        fileUrl: `/uploads/${req.file.filename}` // URL to access the file
    });
});

module.exports = router;
