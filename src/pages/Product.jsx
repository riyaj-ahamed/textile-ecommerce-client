import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import "./Product.css";

// ✅ Local image imports
import dupattaImage from "./chudi2.jpg";
import kurtiImage from "./chudi3.jpg";
import sareeImage from "./saree3.webp";
import fabricImage from "./dress.jpg";

// ✅ Product data with local image variables
const products = [
  { id: 1, name: "Cotton Saree", price: 1299, image: sareeImage },
  { id: 2, name: "Silk Dupatta", price: 799, image: dupattaImage },
  { id: 3, name: "Printed Kurti", price: 999, image: kurtiImage },
  { id: 4, name: "Handloom Fabric", price: 499, image: fabricImage },
];

const TextileProducts = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const alreadyInCart = cartItems.find((item) => item.id === product.id);
    if (alreadyInCart) {
      alert(`${product.name} is already in your cart.`);
      return;
    }

    dispatch(addToCart({ ...product, quantity: 1 }));
    alert(`${product.name} added to cart!`);
    navigate("/cart");
  };

  return (
    <div className="textile-container">
      <h2 className="textile-heading">Textile Products</h2>
      <div className="textile-grid">
        {products.map((product) => (
          <div key={product.id} className="textile-card">
            <img src={product.image} alt={product.name} className="textile-img" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.price}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextileProducts;
