import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { LoginContext } from "../../../App";

export default function LoginForm() {
  const navigate = useNavigate();

  // Logged in state
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  // States for the form
  const [username, setUsername] = useState("testuser");
  const [password, setPassword] = useState("12345");

  // Check if user is already logged in and then redirect
  useEffect(() => {
    if (loggedIn === true) {
      // Navigate to somewhere else if they are logged in already
      navigate("/");
    }
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
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
      navigate("/messages");
    } catch (error) {
      console.log("Error logging in:", error);
    }
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}
