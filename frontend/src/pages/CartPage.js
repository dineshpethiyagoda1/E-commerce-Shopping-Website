import React from "react";
import "./CartPage.css";
import { useCart } from "../context/CartContext";

function money(n) {
  return `$${Number(n).toFixed(2)}`;
}

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart, subtotal } = useCart();

  const shipping = 0.0;
  const grandTotal = subtotal + shipping;

  return (
    <div className="page-wrapper">

      {/* PAGE TITLE */}
      <section className="page-title">
        <h1>Your Product Cart</h1>
      </section>

      <main className="cart-wrap">

        {/* LEFT: CART ITEMS */}
        <section className="cart-items">
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-row" key={item.id}>

                {/* Product Image */}
                <div className="p-img">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* Product Name */}
                <div className="p-name-col">
                  <span className="p-name">{item.name}</span>
                </div>

                {/* Price */}
                <div className="col">
                  <div className="col-title">PRICE</div>
                  <div className="price">{money(item.price)}</div>
                </div>

                {/* Quantity */}
                <div className="col">
                  <div className="col-title">QUANTITY</div>
                  <div className="qty-box">
                    <button className="qty-btn" onClick={() => decreaseQty(item.id)}>−</button>
                    <span className="qty">{item.qty}</span>
                    <button className="qty-btn" onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                </div>

                {/* Total */}
                <div className="col">
                  <div className="col-title">TOTAL</div>
                  <div className="line-total">{money(item.price * item.qty)}</div>
                </div>

                {/* Remove */}
                <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove">
                  🗑
                </button>

              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {cart.length === 0 && (
            <div className="empty">
              <h3>Your cart is empty 🛒</h3>
              <p>Add some products and come back.</p>
              <a className="btn-dark" href="/products">Go to Products</a>
            </div>
          )}
        </section>

        {/* RIGHT: ORDER SUMMARY */}
        <aside className="summary">
          <h3>ORDER SUMMARY</h3>

          <div className="sum-row">
            <span>SUBTOTAL:</span>
            <strong>{money(subtotal)}</strong>
          </div>
          <div className="sum-row">
            <span>SHIPPING:</span>
            <strong>{money(shipping)}</strong>
          </div>
          <div className="sum-row total">
            <span>TOTAL:</span>
            <strong>{money(grandTotal)}</strong>
          </div>

          <button
            className="btn-dark checkout-btn"
            onClick={() => {
              if (cart.length === 0) { alert("Your cart is empty!"); return; }
              alert("Proceeding to checkout...");
            }}
          >
            Proceed To Checkout →
          </button>

          <button className="btn-outline" onClick={() => window.location.href = "/products"}>
            Continue Shopping
          </button>
        </aside>

      </main>
    </div>
  );
}

