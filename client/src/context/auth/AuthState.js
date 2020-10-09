import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

import setAuthToken from "../../components/setAuthToken";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User
  const loadUser = async () => {
    // Get token into global axios header
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    // Get the user related to this token
    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      // Or dispatch error if token not present
      dispatch({ type: AUTH_ERROR, payload: error.response.data });
    }
  };

  // Register User
  const registerUser = async (formData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formData, config);
      //   res.data has the JWT token from the API
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      //   After registration of user done. Load the user too.
      loadUser();
    } catch (error) {
      //   errror.response.data has the msg replied by API
      dispatch({ type: REGISTER_FAIL, payload: error.response.data });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", formData, config);
      //   res.data has the token
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      //   After registration of user done. Load the user too.
      loadUser();
    } catch (error) {
      console.log(error.response);
      //   errror.response.data has the msg replied by API
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT, payload: null });

  // Clear Errors
  const clearError = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        registerUser,
        clearError,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
