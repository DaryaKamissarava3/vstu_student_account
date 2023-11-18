import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

export const NavigationButton = ({ to, icon, text, isActive }) => {
  return (
    <Link to={to} className={`sidebar-button ${isActive ? 'active' : ''}`}>
      <div className="button-content">
        <img src={icon} alt="Button icon" className="button_icon"/>
        <span className="button_text">{text}</span>
      </div>
    </Link>
  );
};
