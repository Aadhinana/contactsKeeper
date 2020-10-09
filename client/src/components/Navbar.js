import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";
import ContactContext from "../context/contacts/ContactsContext";

const Navbar = (props) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const { isAuthenticated, user, logout } = authContext;
  const { clearContacts } = contactContext;

  const logoutHandler = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <Fragment>
      <ul>
        <li>
          <Link to="/">Hello {user && user.name}</Link>
        </li>
        <li onClick={logoutHandler}>
          <a href="#">Logout</a>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </Fragment>
  );

  return (
    <nav className="navbar bg-dark">
      Contacts Keeper
      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

export default Navbar;
