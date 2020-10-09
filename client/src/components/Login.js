import React, { useState, useContext, useEffect } from "react";

import AlertContext from "../context/alert/AlertContext";
import AuthContext from "../context/auth/AuthContext";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, isAuthenticated, error, clearError } = authContext;

  useEffect(() => {
    // After login go to /
    if (isAuthenticated) {
      props.history.push("/");
    }

    setAlert(error);

    setTimeout(() => clearError(), 2000);
  }, [error, isAuthenticated, props.history]);

  const [formState, setformState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formState;

  const onChange = (e) => {
    setformState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    // validation
    if (email === "" || password === "") {
      setAlert("Fill in all fields");
    } else {
      login(formState);
    }
  };

  return (
    <form className="form-container">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        required
      />

      <button type="submit" className="btn btn-dark" onClick={loginHandler}>
        Login
      </button>
    </form>
  );
};

export default Login;
