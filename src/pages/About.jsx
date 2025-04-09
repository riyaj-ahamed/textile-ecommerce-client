import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">Crafting Threads of Tradition with Modern Elegance</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            We are a passionate team dedicated to bringing the finest textile products to your doorstep.
            Our platform bridges the gap between traditional craftsmanship and contemporary fashion, 
            offering handpicked collections that reflect both culture and comfort.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower local artisans and deliver top-quality, sustainable textiles.
            We aim to be your go-to destination for all things fabric, fashion, and feel-good shopping.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose Us?</h2>
          <ul className="about-list">
            <li>✔️ Ethically sourced, premium fabrics</li>
            <li>✔️ Handcrafted styles with modern appeal</li>
            <li>✔️ Fast delivery & easy returns</li>
            <li>✔️ Dedicated customer service</li>
          </ul>
        </section>

        <section className="about-section contact-cta">
          <p>Have questions? <a href="/contact">Contact us</a> – we're happy to help!</p>
        </section>
      </div>
    </div>
  );
};

export default About;
