// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/api';

const Sidebar = ({ isOpen, onClose }) => (
  <div className={`sidebar ${isOpen ? 'open' : ''}`}>
    <button className="close-btn" onClick={onClose}>×</button>
    <ul>
      <li><Link to="/" onClick={onClose}>Home</Link></li>
      <li><Link to="/product" onClick={onClose}>Products</Link></li>
      <li><Link to="/cart" onClick={onClose}>Cart</Link></li>
      <li><Link to="/login" onClick={onClose}>Login</Link></li>
    </ul>
  </div>
);

const Home = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    login.get('/v1/products')
      .then((res) => {
        setProducts(res.data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Failed to fetch products:', err.message);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    navigate('/cart');
  };

  return (
    <div className="homepage-container">
      <header className="header">
        <div className="title">Textile Store</div>
        <button className="menu-icon" onClick={toggleMenu}>☰</button>
      </header>

      <Sidebar isOpen={isMenuOpen} onClose={closeMenu} />

      <section className="hero-section">
        <h1 className="hero-title">Discover the Best in Textile Fashion</h1>
        <p className="hero-text">Trendy designs, quality fabric, and unbeatable prices!</p>
        <Link to="/product" className="shop-now-btn">Shop Now</Link>
      </section>

      <div className="promo-banner">🔥 Flat 50% Off on First Order 🔥</div>

      <div className="filter-bar">
        <input type="text" placeholder="Search Products..." />
        <select>
          <option value="">Category</option>
          <option value="sarees">Sarees</option>
          <option value="dresses">Dresses</option>
          <option value="kurtas">Kurtas</option>
        </select>
        <select>
          <option value="">Sort By</option>
          <option value="new">Newest</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <section className="products-section">
        <h2 className="section-title">Featured Products</h2>
        <div className="products-grid">
          {loading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div className="product-card" key={product._id}>
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </section>

      <div className="newsletter">
        <h3>Subscribe to our Newsletter</h3>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </div>

      <div className="customer-reviews">
        <h3>Customer Reviews</h3>
        <div className="review-card">
          <p>"Amazing quality and fast delivery. Highly recommend!"</p>
          <strong>- Priya</strong>
        </div>
        <div className="review-card">
          <p>"Affordable and trendy. Loved the fabric!"</p>
          <strong>- Ram</strong>
        </div>
      </div>

      <Link to="/cart" className="floating-cart">🛒 Cart</Link>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Textile Store. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
