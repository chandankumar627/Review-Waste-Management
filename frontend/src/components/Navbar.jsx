import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="logo-icon">♻️</span>
          <h1>ReVive Waste Monitoring System</h1>
        </div>
        <div className="navbar-links">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Dashboard
          </Link>
          <Link 
            to="/upload" 
            className={location.pathname === '/upload' ? 'active' : ''}
          >
            Upload Waste
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
