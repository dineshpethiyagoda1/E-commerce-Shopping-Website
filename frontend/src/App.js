import React, { useRef, useState } from 'react';

function App() {
  // References for Scrolling
  const homeRef = useRef(null);
  const productsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Scroll Functions
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - 70, // Adjust for sticky navbar
      behavior: 'smooth',
    });
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.priceNum, 0);

  return (
    <div style={{ backgroundColor: '#fff', color: '#000', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. NAVIGATION BAR */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 10%', borderBottom: '1px solid #eee', position: 'sticky', top: 0, background: '#fff', zIndex: 100 }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '22px', cursor: 'pointer' }} onClick={() => scrollToSection(homeRef)}>SHOPHUB</h1>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '30px', fontSize: '14px', fontWeight: '500' }}>
          <li style={{ cursor: 'pointer' }} onClick={() => scrollToSection(homeRef)}>home</li>
          <li style={{ cursor: 'pointer' }} onClick={() => scrollToSection(productsRef)}>shop</li>
          <li style={{ cursor: 'pointer' }} onClick={() => scrollToSection(aboutRef)}>about</li>
          <li style={{ cursor: 'pointer' }} onClick={() => scrollToSection(contactRef)}>contact</li>
        </ul>
        <div style={{ cursor: 'pointer', position: 'relative' }} onClick={() => setIsCartOpen(true)}>
          🛒 <span style={{ position: 'absolute', top: '-8px', right: '-10px', background: '#000', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '50%' }}>{cartItems.length}</span>
        </div>
      </nav>

      {/* 2. HERO BANNER */}
      <header ref={homeRef} style={{ 
        height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600")',
        backgroundSize: 'cover', backgroundPosition: 'center', color: '#fff', textAlign: 'center'
      }}>
        <div>
          <h2 style={{ fontSize: '60px', fontWeight: 'bold', margin: 0 }}>SHOPHUB</h2>
          <p style={{ fontSize: '18px', margin: '15px 0 30px 0' }}>Discover our latest collection.</p>
          <button onClick={() => scrollToSection(productsRef)} style={{ padding: '15px 40px', background: '#fff', color: '#000', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>Shop Now</button>
        </div>
      </header>

      {/* 3. WHY CHOOSE US */}
      <section style={{ padding: '80px 10%', textAlign: 'center' }}>
        <h3 style={{ fontSize: '26px', marginBottom: '50px', fontWeight: 'bold' }}>Why Choose Us</h3>
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}><div style={{fontSize:'40px'}}>🚚</div><p style={{fontWeight:'bold'}}>Fast Delivery</p></div>
          <div style={{ flex: 1 }}><div style={{fontSize:'40px'}}>💳</div><p style={{fontWeight:'bold'}}>Secure Checkout</p></div>
          <div style={{ flex: 1 }}><div style={{fontSize:'40px'}}>🔄</div><p style={{fontWeight:'bold'}}>Easy Returns</p></div>
        </div>
      </section>

      {/* 4. ABOUT US SECTION */}
      <section ref={aboutRef} style={{ padding: '100px 10%', display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap', backgroundColor: '#f9f9f9' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3 style={{ fontSize: '30px', marginBottom: '25px', fontWeight: 'bold' }}>About Us</h3>
          <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>
            We provide the best shopping experience with curated high-quality products.
          </p>
          <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Our Story</h4>
          <p style={{ color: '#777', fontSize: '14px' }}>Founded in 2026, SHOPHUB makes luxury accessible to everyone.</p>
        </div>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600" alt="About Us" style={{ width: '100%', borderRadius: '20px' }} />
        </div>
      </section>

      {/* 5. SHOP / PRODUCTS SECTION */}
      <section ref={productsRef} style={{ padding: '100px 10%' }}>
        <h3 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '60px', fontWeight: 'bold' }}>Featured Products</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
          {[
            { id: 1, name: "Wireless Headphones", price: "$199.99", priceNum: 199.99, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
            { id: 2, name: "Smart Watch", price: "$295.99", priceNum: 295.99, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
            { id: 3, name: "Leather Backpack", price: "$149.99", priceNum: 149.99, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500" }
          ].map((item) => (
            <div key={item.id} style={{ border: '1px solid #eee', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
              <img src={item.img} alt={item.name} style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px' }} />
              <h4 style={{ margin: '20px 0 10px 0' }}>{item.name}</h4>
              <p style={{ fontWeight: 'bold', marginBottom: '20px' }}>{item.price}</p>
              <button onClick={() => addToCart(item)} style={{ width: '100%', padding: '12px', background: '#000', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section ref={contactRef} style={{ padding: '100px 10%', textAlign: 'center', backgroundColor: '#fff' }}>
        <h3 style={{ fontSize: '28px', marginBottom: '30px', fontWeight: 'bold' }}>Contact Us</h3>
        <p style={{ color: '#666', marginBottom: '40px' }}>Have questions? Send us a message!</p>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <input type="email" placeholder="Your Email" style={{ width: '100%', padding: '15px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <textarea placeholder="Your Message" style={{ width: '100%', padding: '15px', height: '100px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }}></textarea>
          <button style={{ padding: '15px 50px', background: '#000', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Send Message</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#000', color: '#fff', padding: '50px 10%', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px' }}>SHOPHUB</h2>
        <p style={{ color: '#555', fontSize: '12px' }}>&copy; 2026 SHOPHUB. All Rights Reserved.</p>
      </footer>

      {/* CART SIDEBAR */}
      {isCartOpen && (
        <div style={{ position: 'fixed', right: 0, top: 0, width: '350px', height: '100%', background: '#fff', zIndex: 1000, padding: '30px', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', color: '#000' }}>
            <h2 style={{ margin: 0 }}>My Cart</h2>
            <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ maxHeight: '60vh', overflowY: 'auto', color: '#000' }}>
            {cartItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '15px', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <img src={item.img} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                <div><h5 style={{ margin: 0 }}>{item.name}</h5><p style={{ margin: 0, fontWeight: 'bold' }}>{item.price}</p></div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px', borderTop: '2px solid #000', paddingTop: '20px', color: '#000' }}>
            <h4>Total: ${totalPrice.toFixed(2)}</h4>
            <button onClick={() => {alert("Order Confirmed!"); setCartItems([]); setIsCartOpen(false);}} style={{ width: '100%', padding: '15px', background: '#000', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Checkout Now</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;