import { useContext } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
// import { LoginContext } from "../../../App";
import LoginContext from "../../context/LoginContext";

export default function Header() {
  const navigate = useNavigate();

  // const [loggedIn, setLoggedIn] = useContext(LoginContext);

  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios({
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
          <p>GET CHATTING</p>
        </div>
        <div className="loginLogoutContainer">
          {loggedIn ? (
            <div className="logoutButton">
              <button type="submit" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login">
              <div className="loginButton">
                <p>Login</p>
              </div>
            </NavLink>
          )}
          {!loggedIn && (
            <NavLink to="/signup">
              <div className="signupNav">
                <p>Signup</p>
              </div>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
}
