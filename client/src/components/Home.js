import React, { useContext, useEffect } from "react";

import Contacts from "../components/Contacts/Contacts";
import ContactForm from "../components/Contacts/ContactForm";
import ContactFilter from "../components/Contacts/ContactFilter";

import AuthContext from "../context/auth/AuthContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  // Check if the user is logged in with token and load the user
  useEffect(() => {
    authContext.loadUser();
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
