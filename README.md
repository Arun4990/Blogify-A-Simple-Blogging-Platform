# 📝 Blogify – A Simple Blogging Platform

A Node.js + Express application with user authentication (JWT), blog CRUD, likes, and secure features.

---

## 🔥 Features

- ✅ User Registration & Login (with JWT)
- ✅ Blog Creation, Editing, Deletion
- ✅ Like Feature for Posts
- ✅ Protected Routes using Middleware
- ✅ Flash Messages
- ✅ Rate Limiting on Login
- ✅ Secure Cookies & CSRF Protection
- ✅ MongoDB & Mongoose Integration
- ✅ Clean UI with EJS Templating

---

## 📸 Screenshots

### 🧑‍💻 Login Page
![Login Page](./ScreenShot/login.png)

### 📝 Register Page
![Register Page](./ScreenShot/register.png)

### 🏠 Home Page
![Home Page](./ScreenShot/home.png)

### 👤 Profile / Dashboard
![Profile](./ScreenShot/dashboard.png)

---

## 🚀 Getting Started

### ⚙️ Prerequisites

- Node.js
- MongoDB (local or cloud)
- Git

### 📥 Installation

```bash
git clone https://github.com/yourusername/blogify.git
cd blogify
npm install
```
---
### 🛠️ Environment Variables

Create a .env file (see .env.example for reference):
* PORT=3000
* MONGO_URL=your_mongo_connection
* JWT_SECRET=your_jwt_secret
* SESSION_SECRET=your_session_secret
* BCRYPT_SALT=10
* NODE_ENV=development

### ▶️ Run the App
    npm start
    Go to http://localhost:3000

### 📁 Project Structure

    ├── model/         # User and Blog Mongoose models
    ├── routes/        # Auth and Blog routes
    ├── views/         # EJS templates
    ├── middleware/    # JWT middleware
    ├── public/        # Static files
    ├── db.js          # MongoDB connection
    ├── app.js         # Main Express server

### 📦 Tech Stack
1. Node.js
2. Express.js
3. MongoDB_Mongoose
4. EJS
5. JWT
6. Bcrypt
7. Helmet
8. Express-Session
9. Connect-Flash

### 👨‍💻 Author - Arun



### GitHub: @Arun4990