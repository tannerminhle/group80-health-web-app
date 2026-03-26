# Health Web App

A full-stack web application for exploring and interacting with healthcare data using modern web technologies.

The application allows users to input personal health metrics and compare them against population data using FHIR healthcare records and Vega visualizations.

---

# Features

- React + Vite frontend
- Node.js backend API
- Integration with FHIR healthcare data
- AI-powered insights using the Groq API
- Health analytics visualizations using Vega-Lite
- Population comparisons for multiple health metrics
- CI/CD with GitHub Actions

---

# Tech Stack

Frontend: React, Vite, JavaScript  
Backend: Node.js, Express  
Visualization: Vega-Lite  
Other: FHIR APIs, Groq API, GitHub Actions

---

# Project Structure

```
src/
├─ client/ (React frontend)
│  ├─ api/
│  ├─ common/
│  │  ├─ components/
│  │  └─ utils.jsx
│  ├─ pages/
│  └─ App.jsx
│
└─ server/ (Node backend)
   ├─ routes/
   │  └─ router.js
   ├─ services/
   │  ├─ fhir.js
   │  └─ groq.js
   ├─ charts/
   │  ├─ bmiChart.js
   │  ├─ bloodPressureChart.js
   │  ├─ bloodPressureRiskChart.js
   │  ├─ weightHeightChart.js
   │  ├─ glucoseRiskChart.js
   │  ├─ heartRateChart.js
   │  ├─ bodyFatChart.js
   │  ├─ leanMassChart.js
   │  └─ healthRadarChart.js
   ├─ utils/
   │  └─ stats.js
   └─ index.js
```

---

# Installation

Clone the repository

```
git clone https://github.com/tannerminhle/group80-health-web-app.git
cd group80-health-web-app
```

Install dependencies

```
npm install
```

---

# Environment Variables

This project uses environment variables for configuration.

A template file is provided at:

```
src/server/.env.template
```

Copy the template to create your local environment file:

```
cp src/server/.env.template src/server/.env
```

Then edit the `.env` file and add the required values.

Example:

```
FHIR_BASE_URL=https://r4.smarthealthit.org
GROQ_API_KEY=your_api_key
PORT=8080
```

---

# Running the Application

## Quickstart (recommended)

1) Install dependencies:

```
npm install
```

2) Start frontend + backend together:

```
npm run dev
```

3) Open the website:
- Use the **Vite Local URL** printed in the terminal (commonly `http://localhost:8080/`).
- If `8080` is busy, Vite will automatically choose another port (e.g. `8081`, `8082`).

### Common issues

**Backend crashed: `EADDRINUSE` (port already in use)**

If you see an error like `EADDRINUSE ... port 5001`, free the port and restart:

```
lsof -nP -iTCP:5001 -sTCP:LISTEN
kill -9 <PID>
npm run dev
```

**FHIR sandbox unreachable**

If the SMART Health IT sandbox is temporarily unreachable, the backend will fall back to synthetic population values so charts can still render locally.

Start the server

```
node src/server/index.js
```

Or run the development environment

```
npm run dev
```

The application will run at:

```
http://localhost:8080
```

---

# API Endpoints

Health check

```
GET /api/health
```

BMI distribution

```
GET /api/vega/bmi?value=26
```

Blood pressure risk zones

```
GET /api/vega/blood-pressure-risk?systolic=105&diastolic=58
```

Weight vs height comparison

```
GET /api/vega/weight-height?height=183&weight=73
```

Glucose risk zones

```
GET /api/vega/glucose?value=95
```

Heart rate

```
GET /api/vega/heart-rate?value=72
```

---

# CI/CD

GitHub Actions workflows for build and deployment are located in:

```
.github/workflows/
```

---

# Contributing

Create a new branch

```
git checkout -b feature/your-feature
```

Commit your changes

```
git commit -m "Add feature"
```

Push your branch

```
git push origin feature/your-feature
```

Then open a Pull Request.

---

# Team

Group 80 – Health Web App

- Tanner Minh Le  
- Anqi Zheng  
- Di Wu