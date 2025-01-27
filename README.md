# Task Tracker

## Project Summary

Task Tracker is a responsive web application designed to help users efficiently manage their daily tasks. Users can create, update, track, and delete tasks, with real-time progress tracking. The app provides a smooth user experience with features like timers, task completion progress, and dark mode support. It also includes secure user authentication and task persistence using a backend API and database.

## Features

### Frontend
	•	User-Friendly Interface: Built with modular React components for tasks, forms, and UI elements.
	•	Real-Time Updates: Progress bars for task completion, providing live feedback.
	•	Dark Mode: Toggle between light and dark themes for improved usability.
	•	Mobile Responsiveness: Fully responsive design for seamless use on mobile, tablet, and desktop devices.
	•	Animations: Smooth hover effects and progress bar animations for a polished look.

### Backend
	•	Secure Authentication: User registration, login, and logout with JWT-based authentication.
	•	Task Operations: REST API endpoints for creating, reading, updating, and deleting tasks.
	•	Persistent Storage: Task data is securely stored in MongoDB.

### Full-Stack
	•	Frontend-Backend Communication: React (frontend) seamlessly integrates with Node.js/Express (backend).
	•	Deployment: Vercel

## Development Time

This project was developed in approximately 4 hours, including frontend and backend integration.

## Running the Project

### Live Deployment

You can view the live version of the project here: [Task Tracker App (Live) (Add the actual link)](https://wyfpgyfdfxv9hxdi.vercel.app/)

### Video Demonstration

Watch the demo on YouTube: [YouTube Link ](https://youtube.com/shorts/6ec-g2GlfkI?feature=share)

### Running Locally

Prerequisites: 
Node.js (v16+), MongoDB, Git

Installation Steps
	
   1.	Clone the repository
   2.	Set up the backend:
      
   Navigate to the backend directory:

      cd backend

Install dependencies:

      npm install


Create a .env file:

      touch .env

Add the following environment variables to .env:

      PORT=5000
      MONGO_URI=<Your MongoDB connection string>
      JWT_SECRET=<Your secret key>

Start the backend server:

      npm start

Set up the frontend

Navigate to the frontend directory:

      cd ../frontend


Install dependencies:

      npm install


Start the development server:

      npm start


Access the application:
      Open your browser and visit: http://localhost:3000

## Features in Detail

### Frontend
	•	Modular and user-friendly React components.
	•	Real-time progress tracking for task completion.
	•	Dark mode toggle for improved usability.
	•	Fully responsive design optimized for mobile, tablet, and desktop.

### Backend
	•	API endpoints for task operations
	•	JWT-based authentication to ensure secure user sessions.
	•	Persistent task storage using MongoDB.

### Full-Stack Integration
	•	RESTful API built with Express.js, consumed by React on the frontend.
	•	Deployment using Vercel