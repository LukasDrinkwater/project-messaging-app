import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { LoginContext } from "../../../App";

export default function Footer() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  return (
    <>
      <div className="footerContainer">
        <div className="footerMessages">
          <NavLink to="/messages">MESSAGES</NavLink>
        </div>
        <div className="footerGroups">
          <NavLink to="/groups">Groups</NavLink>
        </div>
        <div className="footerContacts">
          <NavLink to="/contacts">CONTACTS</NavLink>
        </div>
      </div>
    </>
  );
}
