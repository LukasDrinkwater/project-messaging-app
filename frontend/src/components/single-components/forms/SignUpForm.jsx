import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// username:
// password:
// email:
// messages:
// contacts:
// group:

export default function SignUpForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("testuser");
  const [password, setPassword] = useState("12345");

  const [email, setEmail] = useState("test@email.com");

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: "/authentication/signup",
        data: {
          username,
          password,
          email,
        },
      });
      console.log(response);
      if (response.ok) {
        console.log("signed up");
        navigate("/messages");
      } else {
        console.log("Error signing up", response.status);
      }
    } catch (error) {
      console.log("Error when signing up:", error);
    }
  };

  return (
    <>
      <div className="signUpFormContainer">
        <form onSubmit={handleSignUpSubmit}>
          <div className="formGroup">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}
