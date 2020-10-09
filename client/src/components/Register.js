import React, { useState, useContext, useEffect } from "react";

import AlertContext from "../context/alert/AlertContext";
import AuthContext from "../context/auth/AuthContext";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { error, clearError, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    // After registration go to /
    if (isAuthenticated) {
      return props.history.push("/");
    }

    setAlert(error);

    setTimeout(() => clearError(), 2000);
  }, [error, isAuthenticated, props.history]);

  const [formState, setformState] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formState;

  const onChange = (e) => {
    setformState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // if both passwords dont match
    if (password2 !== password) {
      setAlert("Passwords do not match");
    }
    // Any empty fields
    else if (
      name === "" ||
      email === "" ||
      password === "" ||
      password2 === ""
    ) {
      setAlert("Please Enter all fields");
    }
    // Password length less than 6
    else if (password2.length <= 6 && password.length <= 6) {
      setAlert("Please enter a password with more the 6 Characters");
    }
    // All validation good. Register user
    else {
      authContext.registerUser(formState);
      //   clearFormState();
    }
  };

  return (
    <form className="form-container">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        required
      />
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
        minLength="6"
      />
      <label htmlFor="password2">Confirm Password</label>
      <input
        type="password"
        name="password2"
        value={password2}
        onChange={onChange}
        required
        minLength="6"
      />
      <button type="submit" className="btn btn-dark" onClick={submitHandler}>
        Register
      </button>
    </form>
  );
};

export default Register;
