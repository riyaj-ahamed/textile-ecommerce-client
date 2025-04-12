// src/pages/Product.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { login } from '../api/api';
import "./Product.css";

// Local fallback images
import dupattaImage from "./chudi2.jpg";
import kurtiImage from "./chudi3.jpg";
import sareeImage from "./saree3.webp";
import fabricImage from "./dress.jpg";

const fallbackProducts = [
  {
    _id: "1",
    name: "Cotton Saree",
    price: 1299,
    image: sareeImage,
    category: "Sarees",
    description: "Elegant cotton saree for daily wear",
  },
  {
    _id: "2",
    name: "Silk Dupatta",
    price: 799,
    image: dupattaImage,
    category: "Dress Material",
    description: "Soft silk dupatta for traditional outfits",
  },
  {
    _id: "3",
    name: "Printed Kurti",
    price: 999,
    image: kurtiImage,
    category: "Shirts",
    description: "Colorful printed kurti with modern design",
  },
  {
    _id: "4",
    name: "Handloom Fabric",
    price: 499,
    image: fabricImage,
    category: "Dress Material",
    description: "Quality handloom fabric for custom dresses",
  },
];

const TextileProducts = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await login.get("/products");
        setProducts(res.data);
        setDisplayedProducts(res.data);
      } catch (err) {
        console.error("API fetch failed, loading fallback data.", err);
        setProducts(fallbackProducts);
        setDisplayedProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setDisplayedProducts(filtered);
  }, [products, category, searchTerm, sortOrder]);

  const handleAddToCart = (product) => {
    const alreadyInCart = cartItems.find((item) => item._id === product._id);
    if (alreadyInCart) {
      alert(`${product.name} is already in your cart.`);
      return;
    }

    dispatch(addToCart({ ...product, quantity: 1 }));
    alert(`${product.name} added to cart!`);
    navigate("/cart");
  };

  const categories = ["All", "Sarees", "Shirts", "Trousers", "Dress Material"];

  return (
    <div className="textile-container">
      <h2 className="textile-heading">Textile Products</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="filter-select"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="filter-select"
        >
          <option value="default">Sort by</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="textile-grid">
          {displayedProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            displayedProducts.map((product) => (
              <div key={product._id} className="textile-card">
                <img src={product.image} alt={product.name} className="textile-img" />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">₹{product.price}</p>
                <p className="product-description">{product.description}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TextileProducts;
