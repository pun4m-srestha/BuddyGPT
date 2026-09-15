# BuddyGPT — AI Chat Application

BuddyGPT is a ChatGPT-style full-stack AI chatbot built with React, Express.js, MongoDB, and OpenRouter.

## 🚀 Live Demo

[Open BuddyGPT](https://buddygpt-frontend.onrender.com)

## ✨ Features

* AI-powered conversations
* Create and manage chat threads
* Persistent chat history with MongoDB
* Markdown response rendering
* Syntax highlighting for code
* Dark and light mode
* Responsive ChatGPT-style interface
* REST API with Express.js

## 🛠️ Tech Stack

**Frontend**

* React
* Vite
* CSS
* React Markdown

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* OpenRouter API

**Deployment**

* Render
* MongoDB Atlas

## 📂 Project Structure

```text
BuddyGPT/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/pun4m-srestha/BuddyGPT
cd BuddyGPT
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Create a `.env` file

```env
MONGODB_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 4. Start the backend

```bash
npm start
```

### 5. Install and start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## 🔐 Environment Variables

The project uses environment variables for sensitive credentials:

* `MONGODB_URI`
* `OPENROUTER_API_KEY`

**Never commit your `.env` file or API keys to GitHub.**

## 🚀 Deployment

The backend and frontend are deployed separately on Render.

* Frontend: React/Vite Static Site
* Backend: Node.js/Express Web Service
* Database: MongoDB Atlas

## 👩‍💻 Author

Punam Srestha

BCA Graduate | MCA Student | Aspiring Web Developer
