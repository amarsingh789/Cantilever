import React from 'react';
import { Link } from 'react-router-dom';
import '../NotFound.css'; // CSS file niche hai

const NotFound = () => {
  return (
    <div className="glitch-container">
      <div className="glitch-content">
        <h1 className="glitch-text" data-text="404">404</h1>
        <h2 className="sub-text">SYSTEM ERROR: PAGE NOT FOUND</h2>
        <p className="description">The file you are looking for has been corrupted or removed.</p>
        
        <Link to="/" className="cyber-btn">
          <span aria-hidden="true" className="cyber-btn__glitch">RETURN HOME</span>
          RETURN HOME
        </Link>
      </div>
    </div>
  );
};

export default NotFound;