import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, LayoutDashboard, UploadCloud, MapPin, Shield, LogOut, Menu, X, Info, LogIn, UserPlus } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="logo-icon-container">
            <Leaf className="logo-icon" size={28} />
          </div>
          <h1>ReVive</h1>
        </Link>
        
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
          {user ? (
            <>
              <Link 
                to="/about" 
                className={location.pathname === '/about' ? 'active' : ''}
                onClick={closeMenu}
              >
                <Info size={18} className="nav-icon"/> About
              </Link>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
                onClick={closeMenu}
              >
                <LayoutDashboard size={18} className="nav-icon"/> Dashboard
              </Link>
              <Link 
                to="/upload" 
                className={location.pathname === '/upload' ? 'active' : ''}
                onClick={closeMenu}
              >
                <UploadCloud size={18} className="nav-icon"/> Upload
              </Link>
              <Link 
                to="/map" 
                className={location.pathname === '/map' ? 'active' : ''}
                onClick={closeMenu}
              >
                <MapPin size={18} className="nav-icon"/> Map
              </Link>
              {user.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className={location.pathname === '/admin' ? 'active' : ''}
                  onClick={closeMenu}
                >
                  <Shield size={18} className="nav-icon"/> Admin
                </Link>
              )}
              <button className="btn-logout" onClick={handleLogout}>
                <LogOut size={18} className="nav-icon"/> Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/about" 
                className={location.pathname === '/about' ? 'active' : ''}
                onClick={closeMenu}
              >
                <Info size={18} className="nav-icon"/> About
              </Link>
              <Link 
                to="/login" 
                className={location.pathname === '/login' ? 'active' : ''}
                onClick={closeMenu}
              >
                <LogIn size={18} className="nav-icon"/> Login
              </Link>
              <Link 
                to="/signup" 
                className={`btn-signup ${location.pathname === '/signup' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <UserPlus size={18} className="nav-icon"/> Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
