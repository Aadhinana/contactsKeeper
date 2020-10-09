import React, { useContext } from "react";
import ContactContext from "../../context/contacts/ContactsContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);

  const filterHandler = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      contactContext.removeFilter();
    } else {
      contactContext.filterContacts(e.target.value);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter contacts"
        onChange={filterHandler}
      />
    </div>
  );
};

export default ContactFilter;
