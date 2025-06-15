import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="text-uppercase mb-3">FoodBridge</h5>
            <p className="small">
              Bridging restaurants with nearby NGOs to combat food wastage and feed those in need.
            </p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li><Link to="/about" className="text-white text-decoration-none">About Us</Link></li>
              <li><Link to="/contact" className="text-white text-decoration-none">Contact</Link></li>
              <li><Link to="/register" className="text-white text-decoration-none">Register</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="text-uppercase mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="fas fa-map-marker-alt me-2"></i> 123 City
              </li>
              <li className="mb-2">
                <i className="fas fa-phone me-2"></i> +91 (123) 456-7890
              </li>
              <li className="mb-2">
                <i className="fas fa-envelope me-2"></i> info@foodbridge.org
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-3 bg-light" />
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="small mb-0">
              &copy; {currentYear} FoodBridge. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="/privacy-policy" className="text-white text-decoration-none small me-3">Privacy Policy</a>
            <a href="/terms-of-service" className="text-white text-decoration-none small">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 