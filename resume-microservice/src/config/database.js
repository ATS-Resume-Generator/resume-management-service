const mongoose = require('mongoose');
const logger = require('../logger');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('MongoDB connected successfully');
    } catch (error) {
        logger.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

mongoose.connection.on('error', (error) => {
    logger.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected');
});

module.exports = connectDB;