📦 Node.js MongoDB REST API

A simple RESTful API built with Node.js, Express, and MongoDB, designed to manage contacts.
This project demonstrates basic CRUD operations, connection to MongoDB, and route structure organization.

🚀 Features:
📄 Create, read, update, and delete contacts
🌐 RESTful API architecture
🧩 Modular route and controller structure
🛡️ Validation and error handling
⚙️ Environment configuration with .env
💾 MongoDB connection via Mongoose

🧰 Tech Stack:
Node.js – runtime environment
Express.js – web framework
MongoDB + Mongoose – database and ODM
dotenv – environment variables
ESLint + Prettier – code style and formatting

⚙️ Installation and Setup:
1. Clone the repository
git clone https://github.com/statsik/nodejs-hw-mongodb.git
cd nodejs-hw-mongodb
2. Install dependencies
npm install
3. Set up environment variables
Create a .env file in the root directory (you can copy from .env.example):
PORT=3000
MONGODB_URI=your_mongodb_connection_string
4. Start the server
npm run start
or with nodemon (for development):
npm run dev

Server will start on:
http://localhost:3000
