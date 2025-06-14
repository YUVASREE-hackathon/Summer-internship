// pages/about.js
import React from 'react';

export default function About() {
  return (
    <div className="page-wrapper">
      {/* Purple heading section */}
      <section className="hero purple-hero">
        <div className="container centered-text">
          <h1>About Us</h1>
        </div>
      </section>
      <br /><br /><br />
      {/* Description outside the purple section */}
      <section className="info-section">
        <div className="container narrow-text">
          <p>
            WorkWise is an AI-powered career recommendation platform that helps professionals
            find their ideal job roles based on skills, certifications, and interests.
          </p>
          <p>
            Our mission is to make career planning smart, data-driven, and personalized.
          </p>
        </div>
      </section>
      <br /><br /><br />
      {/* Footer stays as-is */}
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