import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <div className="book-card">
        <div className="book-visual notfound-book">
          <h1 className="notfound-title">404</h1>
          <p className="notfound-text">Page Not Found</p>
        </div>
        <Link to="/" className="back-home-link">
            < i className='bx bx-home home-icon'  ></i> 
             Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
