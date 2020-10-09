import React, { useContext, useEffect } from "react";

import ContactItem from "./ContactItem";
import ContactsContext from "../../context/contacts/ContactsContext";
import AuthContext from "../../context/auth/AuthContext";

const Contacts = () => {
  const contactContext = useContext(ContactsContext);
  const authContext = useContext(AuthContext);

  const { filtered, contacts, getContacts } = contactContext;
  const { isAuthenticated } = authContext;

  useEffect(() => {
    // If user logged in then fetch contacts of that user
    if (isAuthenticated) getContacts();
  }, [isAuthenticated]);

  if (contacts !== null && contacts.length == 0) {
    return <h4>Please Add contacts!</h4>;
  }

  if (contacts !== null) {
    return filtered === null
      ? contacts.map((contact) => (
          <ContactItem contact={contact} key={contact._id} />
        ))
      : filtered.map((contact) => (
          <ContactItem contact={contact} key={contact._id} />
        ));
  } else {
    return <h4>Loading..</h4>;
  }
};

export default Contacts;
