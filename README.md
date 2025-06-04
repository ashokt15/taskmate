# 🧠 Taskmate – Task Management App

Taskmate is a minimalist, modern, and responsive web application that allows users to manage personal or professional tasks with ease. Built with a full-stack architecture using React, Node.js, and MongoDB, it offers a smooth and intelligent user experience.

---

## 🚀 Live Demo

🌐 [Frontend (Vercel)](https://your-taskmate-frontend.vercel.app)  
🔗 [Backend (Heroku)](https://your-taskmate-backend.herokuapp.com)

---

## 🧱 Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | React (Vite), TailwindCSS           |
| Backend    | Node.js, Express                    |
| Database   | MongoDB (Atlas / Docker)            |
| Auth       | JWT-based Authentication            |
| Deployment | Vercel (Frontend), Heroku (Backend) |
| Dev Tools  | Docker, concurrently, dotenv, Git   |

---

## 📁 Folder Structure

```

taskmate/
├── client/ # React frontend
├── server/ # Express backend
│ ├── models/
│ ├── routes/
│ └── index.js
├── .env # Environment variables
├── package.json # Monorepo
├── docker-compose.yml (optional)
└── README.md

```

---

## ✨ Features

### 🔐 Authentication

- JWT-based login & registration
- Secure route protection

### 🏠 Dashboard

- Welcome message
- Task summary (Pending vs Completed)
- Smart suggestions for tasks

### ✅ My Tasks

- View, create, update, and delete tasks
- Filter by tags, status, and due date
- Sort by date or priority

### ⚡ QuickTask Modal

- Fast-entry modal with minimal inputs
- Auto-tag suggestions

### 📈 Analytics

- Line, Bar, and Pie charts for insights
- Task completion rate and breakdown

### 👤 Profile & Settings

- User info, dark mode toggle
- Notification and display preferences

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/taskmate.git
cd taskmate
```

### 2. Setup Environment

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmate
JWT_SECRET=your_jwt_secret
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the App Locally

```bash
npm run dev
```

This will start both client and server concurrently.

---

## 🐳 Docker

Use the following command if you're using Docker for MongoDB:

```bash
docker-compose up -d
```

---

## 🚀 Deployment

### Frontend (Vercel)

- Deploy `client/` folder
- Set `VITE_API_URL` env variable to backend URL

### Backend (Heroku)

- Deploy `server/` folder
- Set env vars:

  - `PORT`
  - `MONGO_URI` (MongoDB Atlas)
  - `JWT_SECRET`
  - `FRONTEND_ORIGIN`

---

## 📜 API Endpoints

### Auth

```
POST   /api/auth/register
POST   /api/auth/login
```

### Tasks

```
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

---

## 🤝 Contributing

Pull requests are welcome! Feel free to open issues or feature requests.

---

## ✍️ Author

Made with ❤️ by [Ashok](https://portfolio-six-flame-46.vercel.app/)
