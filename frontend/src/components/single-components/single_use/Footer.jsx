import { NavLink } from "react-router-dom";

// import { LoginContext } from "../../../App";

import groupsIcon from "../../../assets/header_and_footer/groups.png";
import messagesIcon from "../../../assets/header_and_footer/message.png";
import contactsIcon from "../../../assets/header_and_footer/contacts.png";
import profileIcon from "../../../assets/header_and_footer/profile.png";

export default function Footer() {
  // const [loggedIn, setLoggedIn] = useContext(LoginContext);

  return (
    <>
      <div className="footerContainer">
        <NavLink to="/messages">
          <div className="footerMessages">
            <div className="messagesIcon">
              <img src={messagesIcon} alt="Icon of a message popup" />
            </div>
            <p>MESSAGES</p>
          </div>
        </NavLink>
        <NavLink to="/groups">
          <div className="footerGroups">
            <div className="groupsIcon">
              <img src={groupsIcon} alt="Icon of a group of users" />
            </div>
            <p>GROUPS</p>
          </div>
        </NavLink>
        <NavLink to="/contacts">
          <div className="footerContacts">
            <div className="contactsIcon">
              <img src={contactsIcon} alt="Icon of a contacts book" />
            </div>
            <p>CONTACTS</p>
          </div>
        </NavLink>
        <NavLink to="/contacts/edit-profile">
          <div className="footerProfile">
            <div className="profileIcon">
              <img src={profileIcon} alt="Icon of a outline of a person" />
            </div>
            <p>PROFILE</p>
          </div>
        </NavLink>
      </div>
    </>
  );
}
