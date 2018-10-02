import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className="Header">
      <ul>
        <li>
          <NavLink className="Header__link" exact to="/">Phrases</NavLink>
        </li>
        <li>
          <NavLink className="Header__link" to="/words">Words</NavLink>
        </li>
        <li>
          <NavLink className="Header__link" to="/about">About</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
