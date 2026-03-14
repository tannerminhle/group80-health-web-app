# Health Web App

A full-stack web application for exploring and interacting with healthcare data using modern web technologies.

## Features
- React + Vite frontend
- Node.js backend API
- Integration with FHIR healthcare data
- AI-powered insights using the Groq API
- CI/CD with GitHub Actions

## Tech Stack
Frontend: React, Vite, JavaScript
Backend: Node.js, Express
Visualization: Vega
Other: FHIR APIs, Groq API, GitHub Actions

## Project Structure
src/
├─ client/ (React frontend)
│  ├─ api/
│  └─ common/
│  ├─ pages/
└─ server/ (Node backend)
   ├─ routes/
   └─ services/

## Installation
Clone the repository

git clone https://github.com/tannerminhle/group80-health-web-app.git
cd group80-health-web-app

Install dependencies

npm install

## Environment Variables
This project uses environment variables for configuration.

A template file is provided at:

src/server/.env.template

Copy the template to create your local environment file:

cp src/server/.env.template src/server/.env

Then edit the `.env` file and add the required values.

## Running the Application
Start the server

node src/server/index.js

The application will run at:

http://localhost:8080

## CI/CD
GitHub Actions workflows for build and deployment are located in:

.github/workflows/

## Contributing
Create a new branch

git checkout -b feature/your-feature

Commit your changes

git commit -m "Add feature"

Push your branch

git push origin feature/your-feature

Then open a Pull Request.

## Team
Group 80 – Health Web App

- Tanner Minh Le
- Anqi Zheng
- Di Wu