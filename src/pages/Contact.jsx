import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Reach out with any questions, feedback, or just to say hi.</p>
      </div>

      <div className="contact-content">
        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          {submitted && <p className="success-message">Thank you! We’ll get back to you soon. 💌</p>}
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className="contact-info">
          <h2>Our Info</h2>
          <p><strong>Email:</strong> vip@textilestore.com</p>
          <p><strong>Phone:</strong> +91 95973 04945</p>
          <p><strong>Location:</strong> Dindigul, Tamil Nadu, India</p>
          <p><strong>Working Hours:</strong> Mon - Sat | 8:00 AM - 10:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
