import React, { useContext } from "react";
import ContactContext from "../../context/contacts/ContactsContext";

const ContactItem = ({ contact }) => {
  const { _id, name, phone, type, email } = contact;

  const contactContext = useContext(ContactContext);

  const deleteHadler = () => {
    contactContext.deleteContact(_id);
    contactContext.clearCurrent();
  };

  const editHandler = () => {
    contactContext.setCurrent(contact);
  };

  return (
    <div className="card">
      <h3>{name}</h3>
      <span className="badge" style={{ float: "right" }}>
        {type}
      </span>
      <ul>
        {phone && <li>{phone}</li>}
        {email && <li>{email}</li>}
      </ul>
      <button className="btn" onClick={editHandler}>
        Edit
      </button>
      <button className="btn btn-dark" onClick={deleteHadler}>
        Delete
      </button>
    </div>
  );
};

export default ContactItem;
