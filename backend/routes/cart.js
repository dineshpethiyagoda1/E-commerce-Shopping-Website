const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateQty,
  removeItem,
  clearCart,
} = require("../controllers/cartController");

router.get("/",                 getCart);      // GET    /api/cart
router.post("/add",             addToCart);    // POST   /api/cart/add
router.put("/item/:itemId",     updateQty);    // PUT    /api/cart/item/:itemId
router.delete("/item/:itemId",  removeItem);   // DELETE /api/cart/item/:itemId
router.delete("/clear",         clearCart);    // DELETE /api/cart/clear

module.exports = router;

