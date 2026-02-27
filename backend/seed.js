const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Cart = require('./models/Cart');

const connectDB = require('./config/db');

const products = [
  {
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    price: 199.99,
    category: 'Electronics',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor and GPS',
    price: 299.99,
    category: 'Electronics',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
  },
  {
    name: 'Leather Backpack',
    description: 'Handcrafted genuine leather backpack with laptop compartment',
    price: 149.99,
    category: 'Accessories',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with enhanced cushioning',
    price: 129.99,
    category: 'Footwear',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe',
    price: 89.99,
    category: 'Home',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500',
  },
  {
    name: 'Yoga Mat',
    description: 'Eco-friendly non-slip yoga mat with carrying strap',
    price: 39.99,
    category: 'Sports',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1601925228194-6b7c7b0e0a45?w=500',
  },
  {
    name: 'Sunglasses',
    description: 'UV400 polarized sunglasses with metal frame',
    price: 79.99,
    category: 'Accessories',
    stock: 35,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
  },
  {
    name: 'Mechanical Keyboard',
    description: 'Compact mechanical keyboard with RGB backlight',
    price: 149.99,
    category: 'Electronics',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
  },
  {
    name: 'Water Bottle',
    description: 'Insulated stainless steel water bottle, keeps cold 24h',
    price: 34.99,
    category: 'Sports',
    stock: 80,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
  },
  {
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and color temperature',
    price: 59.99,
    category: 'Home',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1583394293214-0b926b26d3d7?w=500',
  },
];

const seedDB = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Cart.deleteMany({});

    // Create admin user
    console.log('👤 Creating admin user...');
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@shophub.com',
      password: 'admin123',
      role: 'admin',
    });

    // Create test user
    console.log('👤 Creating test user...');
    const testUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'user123',
      role: 'user',
    });

    // Create products
    console.log('📦 Creating products...');
    const createdProducts = await Product.insertMany(products);

    // Create sample orders
    console.log('🛒 Creating sample orders...');
    await Order.create({
      user: testUser._id,
      orderItems: [
        {
          product: createdProducts[0]._id,
          name: createdProducts[0].name,
          image: createdProducts[0].image,
          price: createdProducts[0].price,
          quantity: 1,
          category: createdProducts[0].category,
        },
      ],
      shippingAddress: {
        fullName: 'John Doe',
        streetAddress: '123 Main St',
        city: 'New York',
        postalCode: '10001',
        country: 'USA',
      },
      itemsPrice: 199.99,
      shippingPrice: 0,
      totalPrice: 199.99,
      status: 'Delivered',
      isDelivered: true,
      deliveredAt: new Date(),
    });

    await Order.create({
      user: testUser._id,
      orderItems: [
        {
          product: createdProducts[1]._id,
          name: createdProducts[1].name,
          image: createdProducts[1].image,
          price: createdProducts[1].price,
          quantity: 1,
          category: createdProducts[1].category,
        },
      ],
      shippingAddress: {
        fullName: 'John Doe',
        streetAddress: '123 Main St',
        city: 'New York',
        postalCode: '10001',
        country: 'USA',
      },
      itemsPrice: 299.99,
      shippingPrice: 0,
      totalPrice: 299.99,
      status: 'Pending',
    });

    console.log('✅ Database seeded successfully!');
    console.log('');
    console.log('📋 Login Credentials:');
    console.log('   Admin: admin@shophub.com / admin123');
    console.log('   User:  john@example.com  / user123');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDB();
