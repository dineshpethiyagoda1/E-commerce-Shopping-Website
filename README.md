# 🛍️ SHOPHUB  
### Full Stack MERN E-Commerce Platform

SHOPHUB is a full-stack e-commerce web application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.  
The project follows an industry-style architecture with role-based authentication, modular structure, and structured Git workflow for team collaboration.

---

## 🚀 Tech Stack

### 🔹 Frontend
- React.js
- React Router DOM
- Context API (Authentication & Cart)
- Modular CSS Styling

### 🔹 Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Role-Based Authorization
- Custom Middleware (Auth & Admin Protection)
- File Upload Handling

---

## 📂 Project Structure

```
SHOPHUB/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── seed.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── common/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── utils/
│   └── package.json
│
└── README.md
```

---

## ✨ Features

### 👤 User Features
- User Registration & Login (JWT-based)
- Browse Product Catalog
- View Product Details
- Add to Cart
- Update Cart Quantity
- Remove Items from Cart
- Secure Checkout Process
- Order Confirmation
- View Order History

---

### 🛠️ Admin Features
- Admin Dashboard (Overview & Statistics)
- Product Management
  - Add Product
  - Edit Product
  - Delete Product
- Order Management
  - View All Orders
  - Update Order Status

---

## 👥 Team Responsibilities

Each member works in a dedicated feature branch.

| Member | Feature | Branch |
|---------|---------|---------|
| Nasli Nawas | Home Page | `feature/home-page` |
| Tharushi | Authentication | `feature/auth-pages` |
| Savindu | Product Viewing | `feature/product-pages` |
| Niwarthana | Cart Functionality | `feature/cart` |
| Ashini | Checkout Process | `feature/checkout` |
| Sameera | Order History | `feature/order-history` |
| Shanuka | Admin Dashboard & Orders | `feature/admin-dashboard` |
| Dinesh (Leader) | Base Setup + Admin Products | `main` / `feature/admin-products` |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/shophub.git
cd shophub
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:  
`http://localhost:5000`

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:  
`http://localhost:3000`

---

## 🔐 Environment Variables (Backend)

Create a `.env` file inside `backend/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

## 🌱 Database Seeding (Optional)

```
node seed.js
```

Seeds:
- Default Admin User
- Sample Products

---

## 🔄 Git Workflow Rules

- Work only on your assigned branch.
- Do not modify other members’ files.
- Use meaningful commit messages.
- Create Pull Requests before merging.
- Only the team leader merges into `main`.

---

## 📦 Commit Message Convention

```
feat: add new feature
fix: resolve bug
chore: project setup
refactor: improve existing code
```

---

## 🎯 Project Goals

- Apply real-world MERN architecture
- Practice collaborative Git workflow
- Implement secure authentication & authorization
- Build a scalable e-commerce platform

---

## 📄 License

This project is developed for academic and portfolio purposes.
