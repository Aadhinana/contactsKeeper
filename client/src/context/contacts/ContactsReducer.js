import {
  ADD_CONTACT,
  DELETE_CONTACT,
  FETCH_CONTACTS,
  CLEAR_CONTACTS,
  FILTER_CONTACT,
  REMOVE_FILTER,
  UDPATE_CONTACT,
  CONTACT_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null,
      };
    case FETCH_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload.contact, ...state.contacts],
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
      };
    case UDPATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          if (contact._id === action.payload._id) {
            return action.payload;
          }
          return contact;
        }),
      };
    case FILTER_CONTACT:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const re = new RegExp(action.payload.toLowerCase(), "gi");
          return (
            contact.name.toLowerCase().match(re) ||
            contact.email.toLowerCase().match(re)
          );
        }),
      };
    case REMOVE_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    default:
      return state;
  }
};
