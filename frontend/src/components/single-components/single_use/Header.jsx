import { useContext } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { LoginContext } from "../../../App";

export default function Header() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "/authentication/logout",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("logging out");
      setLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <>
      <div className="headerContainer">
        <div className="logo">
          <p>MESSAGING APP LOGO</p>
        </div>
        <div className="loginLogoutContainer">
          {loggedIn ? (
            <div className="logoutButton">
              <button type="submit" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="loginButton">
              <NavLink to="/login">Login</NavLink>
            </div>
          )}
          {!loggedIn && (
            <div className="signupNav">
              <NavLink to="/signup">Signup</NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
