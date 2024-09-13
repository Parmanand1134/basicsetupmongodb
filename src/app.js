const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./routes'); // Import the routes index
const errorHandler = require('./middlewares/errorHandler');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize express app
const app = express();

// Middleware: Body parser and URL encoding
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Middleware: CORS
app.use(cors());

// Middleware: Helmet (for security headers)
app.use(helmet());

// Middleware: Morgan (for logging HTTP requests)
app.use(morgan('dev'));

// Middleware: Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
});

// app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use('/api', limiter);

// Routes
// app.use('/api/auth', authRoutes);
app.use('/api', routes);


// Error handling middleware
app.use(errorHandler);

// Export app
module.exports = app;
