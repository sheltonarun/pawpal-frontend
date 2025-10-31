🐾 PawPal – Pet Adoption and Management Platform

PawPal is a full-stack MERN (MongoDB, Express, React, Node.js) application that connects pet owners and adopters in one platform.
It features user authentication, admin control, and a simple interface to browse, add, and manage pets.

🚀 Features

User and Admin Login/Signup

Manage Pets (Add, Edit, Delete)

Manage Users (Admin only)

Role-based Dashboard

REST API Integration

Secure Authentication with JWT

MongoDB Atlas Cloud Database

Hosted using Render

🧰 Tech Stack
Layer	Technology
Frontend	React, Bootstrap, Axios
Backend	Node.js, Express.js
Database	MongoDB Atlas
Hosting	Render
Version Control	GitHub
⚙️ Project Setup Instructions
🖥️ Prerequisites

Make sure you have the following installed:

Node.js (v16 or higher)

npm (v8 or higher)

Git

MongoDB Atlas Account

🗂️ Folder Structure
PAWPAL/
│
├── client/                # Frontend (React)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
│
├── server/                # Backend (Node + Express)
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env
│
└── README.md

🧩 Backend Setup (Server)

Navigate to the backend folder:

cd server


Install dependencies:

npm install


Create a .env file:

MONGO_URI=mongodb+srv://username:password@cluster0.sxc8qe4.mongodb.net/pawpal?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=secret_code
PORT=5000


Run the backend locally:

node server.js


You should see:
✅ MongoDB connected
🌐 Server running on 5000

Deploy to Render:

Go to https://render.com

Create a new Web Service

Connect your GitHub repo

Set:

Build Command: npm install

Start Command: node server.js

Environment Variables: Copy values from your .env file

Deploy 🎉

🎨 Frontend Setup (Client)

Open the client folder:

cd client


Install dependencies:

npm install


Create a .env file inside client/:

REACT_APP_API_URL=https://pawpal-backend.onrender.com/api


Run locally:

npm start


For production build:

npm run build


Deploy to Render (Static Site):

Go to Render Dashboard → “New Static Site”

Connect GitHub repo

Branch: main

Build Command: npm run build

Publish Directory: client/build

Add environment variable:

REACT_APP_API_URL=https://pawpal-backend.onrender.com/api

🧑‍💼 Admin Access

After seeding data or signing up manually in MongoDB:

Email: admin@pawpal.com

Password: admin123

(Admin can add/remove users and pets)

🌐 Live Demo & Source
Resource	Link
Frontend (React)	https://pawpal-frontend.onrender.com

Backend (API)	https://pawpal-backend.onrender.com

GitHub Repo	https://github.com/sheltonarun/pawpal

Demo Video	(Add YouTube Link Here)
🔒 Best Practices Followed

Secure environment variables via .env

JWT-based authentication

Proper CORS handling

Modular code structure

Error handling for all routes

Validation using Express Validator

💬 Contact

👤 Developer: Shelton Arun
📧 Email: sheltonarun@karunya.edu.in

📍 Project: PawPal – Smart Pet Adoption System
