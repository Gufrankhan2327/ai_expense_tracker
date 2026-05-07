# 💸 AI Expense Tracker

A modern **AI-powered Expense Tracker** built using **React, Node.js, MongoDB** with real-time analytics, smart categorization, and role-based dashboards.

---

## 🚀 Key Features

### 👤 User Dashboard

* ➕ Add / ✏️ Edit / ❌ Delete Expenses
* 📊 Real-time Dashboard
* 📈 Analytics & Insights
* 💰 Budget Tracking
* 🧾 Transaction History
* 🤖 AI-based spending insights

### 🧑‍💼 Admin Dashboard

* 👥 User Management
* 📊 System Analytics
* 📄 Reports
* ⚙️ Settings

---

## 🛠️ Tech Stack

### 🎨 Frontend

* React.js (Vite)
* Tailwind CSS
* Axios
* Recharts

### ⚙️ Backend

* Node.js
* Express.js
* JWT Authentication

### 🗄️ Database

* MongoDB Atlas

---

## 📁 Folder Structure

```
frontend/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   │   ├── user/
 │   │   ├── admin/
 │   ├── routes/
 │   ├── services/

backend/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── server.js
```

---

## 🔐 Authentication Flow

```
Login → JWT Token → Protected Routes → Role-based Dashboard
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/your-username/ai-expense-tracker.git
cd ai-expense-tracker
```

---

### Backend Setup

```bash
cd backend
npm install
nodemon server.js
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create `.env` file in backend:

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

---

## 🧪 Demo Login

### 👤 User

* Email: [gufran@gmail.com](mailto:gufran@gmail.com)
* Password: 123456

### 🧑‍💼 Admin

* Email: [admin@gmail.com](mailto:admin@gmail.com)
* Password: 123456

---

## 🌐 Deployment

| Part     | Platform      |
| -------- | ------------- |
| Frontend | Render        |
| Backend  | Render        |
| Database | MongoDB Atlas |

---

## 🔌 API Endpoints

### Auth

* POST /api/auth/login
* POST /api/auth/signup

### Expenses

* GET /api/expenses
* POST /api/expenses/add
* PUT /api/expenses/:id
* DELETE /api/expenses/:id

---

## 🚀 Future Improvements

* 🔔 Notification System
* 📱 Mobile App (React Native)
* 🤖 Advanced AI Insights
* 🌍 Multi-currency Support

---

## 👨‍💻 Author

**Gufran Khan**
Full Stack Developer (MERN + AI)

---

## ⭐ Show Your Support

If you like this project:

* ⭐ Star the repo
* 🔗 Share with others
* 💼 Use in your portfolio
