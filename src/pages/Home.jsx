import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import "./Home.css";
import bgImage from "./bg.jpg";
import featureImage from "./feature.jpeg";
import pantsImage from "./pants.jpeg";

const HomePage = () => {
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err));

    axios.get("http://localhost:5000/api/test")
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (product) => {
    if (!product?.id || !product?.name || product?.price == null) {
      alert("Invalid product details.");
      return;
    }

    if (cart.some(item => item.id === product.id)) {
      alert("This product is already in your cart.");
      return;
    }

    if (typeof product.price !== "number" || product.price < 0) {
      alert("Invalid product price.");
      return;
    }

    setCart([...cart, product]);
    alert(`${product.name} added to cart.`);
  };

  const handleNewsletterSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");
      alert("Subscribed successfully!");
      setEmail(""); // Clear field
    }
  };

  return (
    <div className="homepage-container">
      <header className="header">
        <h1 className="title">VIP COLLECTIONS</h1>
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
        <nav className={`side-nav ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li><Link to="/">🏠 Home</Link></li>
            <li><Link to="/profile">👤 Profile</Link></li>
            <li><Link to="/Cart">🛒 Cart</Link></li>
            <li><Link to="/about">ℹ️ About</Link></li>
            <li><Link to="/contact">📞 Contact</Link></li>
            <li><Link to="/Checkout">💳 Checkout</Link></li>
            <li><Link to="/Login">🔐 Login</Link></li>
          </ul>
        </nav>
      </header>

      <section className="hero-section" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="hero-overlay">
          <h2 className="hero-title">Welcome to VIP COLLECTIONS</h2>
          <p className="hero-text">
            {message || "Explore premium textile fashion today. Trendy, Elegant, Affordable."}
          </p>
          <Link to="/Product" className="shop-now-btn">🛍️ Shop Now</Link>
        </div>
      </section>

      <section className="promo-banner">
        <h3>🎁 Special Offer: Flat 20% off on your first purchase!</h3>
        <p>Use code: <strong>VIP20</strong> at checkout</p>
      </section>

      <section className="filter-bar">
        <input type="text" placeholder="Search products..." />
        <select>
          <option>All Categories</option>
          <option>Shirts</option>
          <option>Pants</option>
          <option>Accessories</option>
        </select>
      </section>

      <section className="category-carousel">
        <div className="category-card">
          <img src={featureImage} alt="Shirts" />
          <h4>Shirts</h4>
        </div>
        <div className="category-card">
          <img src={pantsImage} alt="Pants" />
          <h4>Pants</h4>
        </div>
      </section>

      <section className="products-section">
        <h2 className="section-title">Offers for Birthday Person</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">
                {product.price === 0 ? "🎉 Free!" : `₹${product.price}`}
              </p>
              {product.price !== 0 && (
                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                  <ShoppingCart className="cart-icon" size={16} />
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="newsletter">
        <h2>📬 Subscribe to Our Newsletter</h2>
        <p>Get latest updates and exclusive deals directly to your inbox.</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleNewsletterSubmit}>Subscribe</button>
        {emailError && <p className="error">{emailError}</p>}
      </section>

      <section className="customer-reviews">
        <h2>💬 Customer Reviews</h2>
        <div className="review-card">"The quality of the fabric is outstanding. Highly recommend!"</div>
        <div className="review-card">"Smooth shopping experience and great discounts!"</div>
      </section>

      <Link to="/Cart" className="floating-cart">🛍️ View Cart ({cart.length})</Link>

      <footer className="footer">
        &copy; 2025 VIP COLLECTIONS. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
