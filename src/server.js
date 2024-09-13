const dotenv = require('dotenv');
const app = require('./app');

// Load environment variables
dotenv.config();

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
