import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className="Header">
      <div className="container Header__container">
        <div className="Header__logo">
          <div className="Header__logo-blue"></div>
          <div className="Header__logo-white"></div>
          <div className="Header__logo-red"></div>
        </div>
        <div className="Header__links">
          <NavLink className="Header__link" exact to="/">Phrases</NavLink>
          <NavLink className="Header__link" to="/words">Words</NavLink>
          <NavLink className="Header__link" to="/about">About</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
