import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import LoginContext from "../../context/LoginContext";

export default function LoginForm() {
  // Logged in state
  // Destructure the state and set state for loggedIn
  const { setLoggedIn } = useContext(LoginContext);

  // Navigation
  const navigate = useNavigate();
  const location = useLocation();
  // from is where the user just came from. I.e where they were when they got sent
  // to the login page
  const from = location.state?.from?.pathname || "/";

  // States for the form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios({
        method: "POST",
        url: "/authentication/login",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username,
          password,
        },
      });

      setLoggedIn(true);

      //
      navigate(from, { replace: true });
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };

  const handleDefaultLogin = () => {
    setUsername("testuser");
    setPassword("12345");
  };

  return (
    <>
      <div className="loginContainer">
        <span>
          <h1>Login</h1>
        </span>
        <div className="loginFormContainer">
          <form onSubmit={handleLoginSubmit}>
            <div className="formGroup">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
            <div className="formGroup">
              <button type="button" onClick={handleDefaultLogin}>
                Click to use sample account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
