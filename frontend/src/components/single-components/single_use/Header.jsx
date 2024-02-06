import { useContext } from "react";

import { LoginContext } from "../../../App";

export default function Header() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  return (
    <>
      <div className="headerContainer">
        <div className="logo">
          <p>MESSAGING APP LOGO</p>
        </div>
        <div className="loginLogoutContainer">
          {loggedIn ? (
            <div className="logoutButton">
              <button>Logout</button>
            </div>
          ) : (
            <div className="loginButton">
              <button>Login</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
