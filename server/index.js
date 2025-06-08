const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

const app = express();

// Middleware to enable CORS (Cross-Origin Resource Sharing)
// Allows requests from the specified frontend origin.
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN, // e.g., 'http://localhost:5173' or 'https://your-vercel-frontend.vercel.app'
  credentials: true, // Allow cookies to be sent with requests
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Define API routes
// Authentication routes
app.use('/api/auth', authRoutes);
// Task management routes
app.use('/api/tasks', taskRoutes);

// Basic route for testing server status
app.get('/', (req, res) => {
  res.send('Taskmate API is running...');
});

// Define the port for the server to listen on
// Uses the PORT environment variable or defaults to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
