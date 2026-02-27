const Cart = require("../models/Cart");

// Helper - cart 
const getOrCreateCart = async (sessionId) => {
  let cart = await Cart.findOne({ sessionId });
  if (!cart) {
    cart = new Cart({ sessionId, items: [] });
    await cart.save();
  }
  return cart;
};

// ─────────────────────────────────────────────
// GET /api/cart
// ─────────────────────────────────────────────
exports.getCart = async (req, res) => {
  try {
    const sessionId = req.headers["x-session-id"] || "guest";
    const cart = await getOrCreateCart(sessionId);
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// POST /api/cart/add
// Body: { productId, name, price, image }
// ─────────────────────────────────────────────
exports.addToCart = async (req, res) => {
  try {
    const sessionId = req.headers["x-session-id"] || "guest";
    const { productId, name, price, image } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, message: "name and price required" });
    }

    const cart = await getOrCreateCart(sessionId);

    // Item already in cart ද?
    const existingIndex = cart.items.findIndex(
      (item) => item.productId?.toString() === productId || item.name === name
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].qty += 1;
    } else {
      cart.items.push({ productId, name, price, image, qty: 1 });
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// PUT /api/cart/item/:itemId
// Body: { qty }
// ─────────────────────────────────────────────
exports.updateQty = async (req, res) => {
  try {
    const sessionId = req.headers["x-session-id"] || "guest";
    const { itemId } = req.params;
    const { qty } = req.body;

    const cart = await Cart.findOne({ sessionId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    const itemIndex = cart.items.findIndex((i) => i._id.toString() === itemId);
    if (itemIndex === -1) return res.status(404).json({ success: false, message: "Item not found" });

    if (qty <= 0) {
      // qty 0 or less → remove item
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].qty = qty;
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// DELETE /api/cart/item/:itemId
// ─────────────────────────────────────────────
exports.removeItem = async (req, res) => {
  try {
    const sessionId = req.headers["x-session-id"] || "guest";
    const { itemId } = req.params;

    const cart = await Cart.findOne({ sessionId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter((i) => i._id.toString() !== itemId);
    await cart.save();

    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────
// DELETE /api/cart/clear
// ─────────────────────────────────────────────
exports.clearCart = async (req, res) => {
  try {
    const sessionId = req.headers["x-session-id"] || "guest";
    const cart = await Cart.findOne({ sessionId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ success: true, message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

