import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { LoginContext } from "../../../App";

export default function LoginForm() {
  const navigate = useNavigate();

  // Logged in state
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  // States for the form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Check if user is already logged in and then redirect
  useEffect(() => {
    if (loggedIn === true) {
      // Navigate to somewhere else if they are logged in already
      navigate("/");
    }
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // const response = await axios({
    //   method: "POST",
    //   url: "/login",
    // });
    try {
      const response = await axios({
        method: "POST",
        url: "/api/test",
        data: {
          username,
          password,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.log("Error logging in:", error);
    }

    // try {
    //   const response = await fetch("http://localhost:3000/login", {
    //     credentials: "include",
    //     mode: "cors",
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },

    //     body: JSON.stringify({
    //       username,
    //       password,
    //     }),
    //   });

    //   // if login successfull set loggedIn state to true
    //   if (response.ok) {
    //     // const data = await response.json();
    //     setLoggedIn(true);
    //   }
    // } catch (error) {
    //   console.log("Error when logging in:", error);
    // }
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
