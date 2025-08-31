const request = require('supertest');
const app = require('../src/server'); // Adjust the path if necessary
const mongoose = require('mongoose');
const Resume = require('../src/models/Resume');

describe('Resume Management API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Resume.deleteMany({});
    });

    test('GET /resumes should return an empty array', async () => {
        const response = await request(app).get('/resumes');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    test('POST /resumes should create a new resume', async () => {
        const resumeData = {
            userId: '12345',
            file: 'resume.pdf',
            // Add other fields as necessary
        };

        const response = await request(app).post('/resumes').send(resumeData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.userId).toBe(resumeData.userId);
    });

    test('GET /resumes/:id should return a resume', async () => {
        const resume = new Resume({ userId: '12345', file: 'resume.pdf' });
        await resume.save();

        const response = await request(app).get(`/resumes/${resume._id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', resume._id.toString());
    });

    test('PUT /resumes/:id should update a resume', async () => {
        const resume = new Resume({ userId: '12345', file: 'resume.pdf' });
        await resume.save();

        const updatedData = { userId: '67890', file: 'updated_resume.pdf' };
        const response = await request(app).put(`/resumes/${resume._id}`).send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body.userId).toBe(updatedData.userId);
    });

    test('DELETE /resumes/:id should delete a resume', async () => {
        const resume = new Resume({ userId: '12345', file: 'resume.pdf' });
        await resume.save();

        const response = await request(app).delete(`/resumes/${resume._id}`);
        expect(response.status).toBe(204);

        const deletedResume = await Resume.findById(resume._id);
        expect(deletedResume).toBeNull();
    });
});