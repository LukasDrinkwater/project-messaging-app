import React from "react";

export default function ContactPreview({ contact }) {
  console.log(contact);
  return (
    <>
      <div className="contactPreview">
        <div className="profilePicture">
          <img src="" alt="" />
        </div>
        <div className="contactPreviewName">
          <p>{contact.username}</p>
        </div>
        <div className="contactPreviewMessage">
          <p>{contact.messages.content}</p>
        </div>
        <div className="editContact">
          <button></button>
        </div>
        <div className="editContact">
          <button>EDIT CONTACT</button>
        </div>
      </div>
    </>
  );
}
