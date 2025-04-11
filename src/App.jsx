import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ForgotPasswordPage from "./pages/Forgot";
import TextileProducts from "./pages/Product";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Profile" element={<ProfilePage />} />
      <Route path="/Cart" element={<CartPage />} />
      <Route path="/Checkout" element={<CheckoutPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Register" element={<RegisterPage />} />
      <Route path="/Forgot" element={<ForgotPasswordPage />} />
      <Route path="/Product" element={<TextileProducts />} />
      <Route path="/About" element={<AboutPage />} />
      <Route path="/Contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;
