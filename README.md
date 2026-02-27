🛍️ SHOPHUB — Full Stack E-Commerce Platform

SHOPHUB is a full-stack e-commerce web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).
This project is developed collaboratively, with clearly divided features per team member.

🚀 Tech Stack
🔹 Frontend

React.js

React Router

Context API (Auth & Cart)

CSS (Modular Styling)

🔹 Backend

Node.js

Express.js

MongoDB (Mongoose ODM)

JWT Authentication

Middleware (Auth, Admin Protection)

File Upload Handling

📂 Project Structure
SHOPHUB/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── uploads/
│   ├── server.js
│   └── seed.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/common/
│   │   ├── context/
│   │   ├── utils/
│   │   └── styles/
│   └── public/
│
└── README.md
✨ Features
👤 User Features

User Registration & Login (JWT Authentication)

View Product Catalog

View Product Details

Add to Cart / Update Quantity / Remove Item

Checkout Process

Order Confirmation

Order History

🛠️ Admin Features

Admin Dashboard (Statistics Overview)

Product Management

Add Product

Edit Product

Delete Product

Order Management

View All Orders

Update Order Status

👥 Team Responsibilities

Each member works in a separate feature branch and only pushes assigned files.

Member	Feature	Branch
Nasli Nawas	Home Page	feature/home-page
Tharushi	Authentication	feature/auth-pages
Savindu	Product Viewing	feature/product-pages
Niwarthana	Cart Functionality	feature/cart
Ashini	Checkout Process	feature/checkout
Sameera	Order History	feature/order-history
Shanuka	Admin Dashboard & Orders	feature/admin-dashboard
Dinesh (Leader)	Base Setup + Admin Products	main / feature/admin-products
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/YOUR_USERNAME/shophub.git
cd shophub
2️⃣ Backend Setup
cd backend
npm install

Create .env file using .env.example as reference.

Run backend:

npm run dev

Server runs on:

http://localhost:5000
3️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3000
🔐 Environment Variables (Backend)

Example .env configuration:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
🌱 Database Seeding (Optional)
node seed.js

Seeds sample:

Admin User

Sample Products

🔄 Git Workflow Rules

Work only on your assigned branch.

Do NOT modify other member files.

Use proper commit messages.

Create Pull Requests for review before merging.

Leader merges into main.

📦 Commit Message Convention
feat: new feature added
fix: bug fix
chore: project setup / maintenance
refactor: code improvement
🎯 Project Goals

Apply real-world MERN stack architecture.

Practice team collaboration with Git workflow.

Implement secure authentication and role-based access.

Build a production-style e-commerce system.

📌 Future Improvements

Payment Gateway Integration

Product Reviews & Ratings

Wishlist Feature

Search & Filters

Pagination

Deployment (Render / Vercel / Railway)

📄 License

This project is developed for academic and learning purposes.
