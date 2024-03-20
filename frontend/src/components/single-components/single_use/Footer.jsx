import { useContext } from "react";
import { NavLink } from "react-router-dom";

// import { LoginContext } from "../../../App";

import groupsIcon from "../../../assets/header_and_footer/groups.png";
import messagesIcon from "../../../assets/header_and_footer/message.png";
import contactsIcon from "../../../assets/header_and_footer/contacts.png";

export default function Footer() {
  // const [loggedIn, setLoggedIn] = useContext(LoginContext);

  return (
    <>
      <div className="footerContainer">
        <NavLink to="/messages">
          <div className="footerMessages">
            <div className="messagesIcon">
              <img src={messagesIcon} alt="test" />
            </div>
            <p>MESSAGES</p>
          </div>
        </NavLink>
        {/* <div className="footerGroups">
          <NavLink to="/groups">Groups</NavLink>
        </div> */}
        <NavLink to="/groups">
          <div className="footerGroups">
            <div className="groupsIcon">
              <img src={groupsIcon} alt="test" />
            </div>
            <p>GROUPS</p>
          </div>
        </NavLink>
        <NavLink to="/contacts">
          <div className="footerContacts">
            <div className="contactsIcon">
              <img src={contactsIcon} alt="test" />
            </div>
            <p>CONTACTS</p>
          </div>
        </NavLink>
      </div>
    </>
  );
}
