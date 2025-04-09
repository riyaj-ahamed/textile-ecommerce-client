import React, { useEffect, useState } from "react";
import axios from "axios";
import './Profile.css';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profileImage: "",
  });
  const [orders, setOrders] = useState([]);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get("/api/user/profile");
        const orderRes = await axios.get("/api/orders/myorders");
        setUser(userRes.data);
        setOrders(orderRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUser({ ...user, profileImage: file });
    setPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const newErrors = {};
    if (!user.name.trim()) newErrors.name = "Name is required";
    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "Enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setUpdating(true);
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    if (user.profileImage instanceof File) {
      formData.append("profileImage", user.profileImage);
    }

    try {
      const res = await axios.put("/api/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Profile updated!");
    } catch (err) {
      setMessage("Update failed.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="profile-container">
      <h2 className="profile-heading">My Profile</h2>

      {message && <div className="profile-message">{message}</div>}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="input-group">
          <label>Name</label>
          <input name="name" type="text" value={user.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="input-group">
          <label>Email</label>
          <input name="email" type="email" value={user.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="input-group">
          <label>Profile Picture</label>
          <input type="file" onChange={handleImageChange} />
          {(preview || user.profileImage) && (
            <img src={preview || user.profileImage} alt="Preview" className="profile-image-preview" />
          )}
        </div>

        <button type="submit" disabled={updating} className="update-btn">
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <div className="orders-section">
        <h3 className="orders-heading">Order History</h3>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <span>Order #{order._id}</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="order-details">Total: ₹{order.totalPrice.toFixed(2)}</div>
              <div className="order-details">
                Status: <strong>{order.isDelivered ? "Delivered" : "Processing"}</strong>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
