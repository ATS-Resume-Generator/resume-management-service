# Resume Management Microservice

This is a Node.js microservice for managing resumes. It provides a RESTful API for creating, retrieving, updating, and deleting resumes, along with file upload capabilities.

## Features

- Express.js REST API server
- Endpoints for resume management:
  - `GET /resumes`: Retrieve all resumes
  - `POST /resumes`: Create a new resume
  - `GET /resumes/:id`: Retrieve a specific resume by ID
  - `PUT /resumes/:id`: Update a specific resume by ID
  - `DELETE /resumes/:id`: Delete a specific resume by ID
- File upload handling using multer
- MongoDB connection with mongoose
- Input validation using Joi
- Error handling middleware
- Health check endpoint at `GET /health`
- CORS enabled
- Environment variable configuration
- Basic logging with Winston
- Unit tests with Jest

## Project Structure

```
resume-microservice
├── src
│   ├── server.js
│   ├── routes
│   │   └── resumes.js
│   ├── models
│   │   └── Resume.js
│   ├── middleware
│   │   └── errorHandler.js
│   ├── config
│   │   └── database.js
│   └── logger.js
├── tests
│   └── resumes.test.js
├── uploads
├── package.json
├── Dockerfile
├── .env.example
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd resume-microservice
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and update the values as needed.

### Running the Application

To start the server, run:
```
npm start
```

### Running Tests

To run the unit tests, use:
```
npm test
```

## API Documentation

Refer to the API endpoints listed in the Features section for usage details.

## License

This project is licensed under the MIT License.