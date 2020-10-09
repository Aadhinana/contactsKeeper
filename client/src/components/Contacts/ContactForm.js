import React, { useState, useContext, useEffect } from "react";

import ContactsContext from "../../context/contacts/ContactsContext";

const ContactForm = () => {
  const contactsContext = useContext(ContactsContext);

  const { addContact, current, updateContact, clearCurrent } = contactsContext;

  const [contacts, setContacts] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  // Run only when current changes
  useEffect(() => {
    if (current != null) {
      setContacts(current);
    } else {
      setContacts({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
      clearCurrent();
    }
  }, [current]);

  const onChange = (e) => {
    setContacts({
      ...contacts,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contacts);
    } else {
      updateContact(contacts);
      clearCurrent();
    }
    setContacts({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  const { name, email, type, phone } = contacts;

  return (
    <>
      <h2>{current === null ? "Add " : "Edit "}Contact</h2>
      <form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={onChange}
        />
        <h5>Contact Type :</h5>
        <input
          type="radio"
          value="personal"
          name="type"
          checked={type === "personal"}
          onChange={onChange}
        />{" "}
        Personal{" "}
        <input
          type="radio"
          value="professional"
          name="type"
          checked={type === "professional"}
          onChange={onChange}
        />{" "}
        Professional
        <button
          type="submit"
          className="btn btn-dark btn-block my-1"
          onClick={submitHandler}
        >
          {current === null ? "Add " : "Update "}
        </button>
      </form>
    </>
  );
};

export default ContactForm;
