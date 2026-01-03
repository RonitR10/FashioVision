# 👗 FashioVision – Modern Fashion Shopping Platform (MERN)

FashioVision is a full-stack MERN-based fashion shopping platform designed to provide a smooth and modern online shopping experience.  
The project includes user authentication, product browsing, designer-managed content, and an admin-controlled ecosystem.

> ⚠️ Note: AI / GAN-based virtual try-on is **not implemented yet** in the current version.

---

## 🚀 Features

### 👤 User Features
- User registration and login (JWT-based authentication)
- Browse fashion products
- View designer portfolios
- Add products to cart
- Persistent cart (backend synced)

### 🎨 Designer Dashboard
- Designer login and approval system
- Add, update, and delete products
- Create portfolio posts
- Manage personal designer content

### 🛠️ Admin Capabilities
- Approve designers
- Manage users
- Control platform content

---

## 🧱 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## 📂 Project Structure

```text
FashioVision/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
│   └── main.jsx
│
└── README.md
```

---

## 🔐 Authentication Flow

- JWT-based authentication
- Role-based access (user / designer / admin)
- Designer identity extracted from JWT on backend
- Protected routes for dashboards

---

## 🧩 Current Status

- ✅ Core MERN functionality completed
- ✅ Authentication & role management
- ✅ Designer dashboard implemented
- ❌ AI / GAN Virtual Try-On (planned for future)

---

## 🛠️ Installation & Setup

### Clone Repository
```bash
git clone https://github.com/your-username/FashioVision.git
```
## Backend Setup
```bash
cd backend
npm install
npm run dev
```
## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
## 📌 Future Enhancements
- Virtual Try-On using GAN
- Payment gateway integration
- Advanced product recommendation
- Order tracking system
- 
## 👨‍💻 Author
  Ronit Raj Bairwa
  
  Full Stack Developer (MERN)

## 📄 License

This project is for educational and learning purposes.
