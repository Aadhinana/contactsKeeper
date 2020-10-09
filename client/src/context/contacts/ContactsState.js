import React, { useReducer } from "react";
import axios from "axios";
import ContactsContext from "./ContactsContext";
import ContactsReducer from "./ContactsReducer";

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  CLEAR_CONTACTS,
  FILTER_CONTACT,
  UDPATE_CONTACT,
  REMOVE_FILTER,
  SET_CURRENT,
  CLEAR_CURRENT,
  CONTACT_ERROR,
  FETCH_CONTACTS,
} from "../types";

const ContactsState = (props) => {
  const initialState = {
    contacts: null,
    filtered: null,
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(ContactsReducer, initialState);

  // Get contacts initially associated with the current user
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({ type: FETCH_CONTACTS, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: CONTACT_ERROR, payload: err.reponse.msg });
    }
  };

  //   Add contact
  const addContact = async (contact) => {
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: CONTACT_ERROR, payload: err.reponse.msg });
    }
  };

  // Clear contacts after logout of current existing user
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // Delete contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      console.log(err);
      dispatch({ type: CONTACT_ERROR, payload: err.reponse.msg });
    }
  };

  // Update contact
  const updateContact = async (contact) => {
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UDPATE_CONTACT, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: CONTACT_ERROR, payload: err.reponse.msg });
    }
  };

  // Fitler contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };

  const removeFilter = () => {
    dispatch({ type: REMOVE_FILTER });
  };

  // Set current for edit state to fill form
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        removeFilter,
        getContacts,
        clearContacts,
      }}
    >
      {props.children}
    </ContactsContext.Provider>
  );
};

export default ContactsState;
