// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";

const loadCart = () => {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveCart = (state) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state.cart.cartItems));
  } catch {}
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: { cartItems: loadCart() },
  },
});

store.subscribe(() => saveCart(store.getState()));

export { store };
