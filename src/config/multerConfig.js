const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the directory path for uploads
const uploadsDir = path.join(__dirname, '../../public/uploads');

// Function to ensure the uploads directory exists
const ensureUploadsDirExists = () => {
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }
};

// Ensure the uploads directory exists
ensureUploadsDirExists();

// Define the storage for the uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Use the pre-defined uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

// Create the multer instance
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images only!');
        }
    },
});

module.exports = upload;
