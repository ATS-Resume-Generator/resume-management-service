const express = require('express');
const multer = require('multer');
const Joi = require('joi');
const Resume = require('../models/Resume');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Input validation schema
const resumeSchema = Joi.object({
    userId: Joi.string().required(),
    file: Joi.object().required(),
});

// GET /resumes
router.get('/', async (req, res) => {
    try {
        const resumes = await Resume.find();
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /resumes
router.post('/', upload.single('file'), async (req, res) => {
    const { error } = resumeSchema.validate({ userId: req.body.userId, file: req.file });
    if (error) return res.status(400).json({ message: error.details[0].message });

    const resume = new Resume({
        userId: req.body.userId,
        filePath: req.file.path,
    });

    try {
        const savedResume = await resume.save();
        res.status(201).json(savedResume);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /resumes/:id
router.get('/:id', async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ message: 'Resume not found' });
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /resumes/:id
router.put('/:id', upload.single('file'), async (req, res) => {
    const { error } = resumeSchema.validate({ userId: req.body.userId, file: req.file });
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const updatedResume = await Resume.findByIdAndUpdate(req.params.id, {
            userId: req.body.userId,
            filePath: req.file.path,
        }, { new: true });

        if (!updatedResume) return res.status(404).json({ message: 'Resume not found' });
        res.json(updatedResume);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /resumes/:id
router.delete('/:id', async (req, res) => {
    try {
        const deletedResume = await Resume.findByIdAndDelete(req.params.id);
        if (!deletedResume) return res.status(404).json({ message: 'Resume not found' });
        res.json({ message: 'Resume deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;