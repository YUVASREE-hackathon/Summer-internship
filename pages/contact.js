// pages/contact.js
import React from 'react';

export default function Contact() {
  return (
    <div className="page-wrapper">
      <section className="hero purple-hero">
        <div className="container centered-text">
          <h1>Contact Us</h1>
          <p>If you have any questions, suggestions, or feedback — we'd love to hear from you.</p>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container contact-form">
          <form>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input id="name" type="text" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Your message..." />
            </div>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 WorkWise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
