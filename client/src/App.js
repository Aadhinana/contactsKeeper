import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";
import Alert from "./components/Alert";
import NotFound from "./components/NotFound";

import ContactsState from "./context/contacts/ContactsState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import setAuthToken from "./components/setAuthToken";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

// On app load if any token found then set that as a common global header for all requests.
if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

function App() {
  return (
    <AuthState>
      <ContactsState>
        <AlertState>
          <BrowserRouter>
            <React.Fragment>
              <Navbar />
              <div className="container">
                <Alert />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </React.Fragment>
          </BrowserRouter>
        </AlertState>
      </ContactsState>
    </AuthState>
  );
}

export default App;
