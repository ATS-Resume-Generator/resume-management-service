const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    // Add any additional fields as necessary
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;