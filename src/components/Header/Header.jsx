import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  let adminLink = null;
  if (props.isAuthenticated) {
    adminLink = (
      <NavLink className="Header__link" to="/admin">Admin</NavLink>
    );
  }
  return (
    <header className="Header">
      <div className="container Header__container">
        <NavLink className="Header__logo" exact to="/">
          <div className="Header__logo-blue"></div>
          <div className="Header__logo-white"></div>
          <div className="Header__logo-red"></div>
        </NavLink>
        <div className="Header__links">
          <NavLink className="Header__link" exact to="/">Phrases</NavLink>
          <NavLink className="Header__link" to="/words">Words</NavLink>
          <NavLink className="Header__link" to="/about">About</NavLink>
          {adminLink}
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated
  };
};

export default connect(
  mapStateToProps,

  // Why do I need other params?
  // https://stackoverflow.com/questions/44129789/using-connect-from-react-redux-makes-navlinks-from-react-router-not-work
  null,
  null,
  {pure: false}
)(Header);
