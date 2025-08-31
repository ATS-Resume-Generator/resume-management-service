const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const resumeRoutes = require('./routes/resumes');
const logger = require('./logger');
const database = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
database();

// Routes
app.use('/resumes', resumeRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});