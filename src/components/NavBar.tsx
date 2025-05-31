import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');
    if (!token) navigate('/login');
    if (storedEmail) setEmail(storedEmail);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src="/deptlogo.png" alt="Logo" className="logo-img" />
        <div className="nav-links">
          <NavLink to="/books">Books</NavLink>
          <NavLink to="/library">Library</NavLink>
        </div>
      </div>

      <div className="nav-right" onClick={() => setShowDropdown(!showDropdown)}>
        <i className="bx bxs-user user-icon desktop-only"></i>
        <span className="email desktop-only">{email}</span>
        {showDropdown && (
          <div className="dropdown-menu-desktop desktop-only">
            <button onClick={logout}><i className="bx bx-log-out"></i> Logout</button>
          </div>
        )}
      
        <button className="menu-icon mobile-only" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <i className={menuOpen ? 'bx bx-x' : 'bx bx-menu'}></i>
        </button>

        {menuOpen && (
          <div className="dropdown-menu-mobile">
            <div className="user-info">
              <i className="bx bxs-user user-icon"></i>
              <span className="email">{email}</span>
            </div>
            <NavLink to="/books" onClick={() => setMenuOpen(false)}>Books</NavLink>
            <NavLink to="/library" onClick={() => setMenuOpen(false)}>Library</NavLink>
            <button className="logout-btn" onClick={logout}>
              <i className="bx bx-log-out"></i> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
