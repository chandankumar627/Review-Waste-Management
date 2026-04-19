import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="logo-icon">♻️</span>
          <h1>ReVive Waste Management</h1>
        </div>
        <div className="navbar-links">
          {user ? (
            <>
              <Link 
                to="/about" 
                className={location.pathname === '/about' ? 'active' : ''}
              >
                About
              </Link>
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
              <Link 
                to="/map" 
                className={location.pathname === '/map' ? 'active' : ''}
              >
                Map
              </Link>
              {user.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className={location.pathname === '/admin' ? 'active' : ''}
                >
                  Admin Panel
                </Link>
              )}
              <button className="btn-logout" onClick={handleLogout}>
                Logout ({user.username})
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/about" 
                className={location.pathname === '/about' ? 'active' : ''}
              >
                About
              </Link>
              <Link 
                to="/login" 
                className={location.pathname === '/login' ? 'active' : ''}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className={location.pathname === '/signup' ? 'active' : ''}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
