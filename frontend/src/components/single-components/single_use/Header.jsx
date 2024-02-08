import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
              <button>Login</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
