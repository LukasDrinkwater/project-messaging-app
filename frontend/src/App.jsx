import { useState, createContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

// Create context
export const LoginContext = createContext();

// Import component pages
import LoginPage from "./components/pages/LoginPage";

function App() {
  const [loggedIn, setLoggedIn] = useState({ loggedIn: false, admin: false });

  // runs on first page load. Initial load or after a user leaves and comes back to the
  // site and the session cookie still exists. Then updates loggedIn state

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const response = await fetch("http://localhost:3000/check-auth", {
          credentials: "include",
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.loggedIn) {
            setLoggedIn(true);
          } else {
            // Redirect to login page
          }
        }
      } catch (error) {
        console.log("Error checking logged in status:", error);
      }
    };
    checkIfLoggedIn();
  });

  return (
    <>
      <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
        <div className="content">
          {/* <Header /> */}
          <Routes>
            <Route path="/login" Component={LoginPage}></Route>
          </Routes>
          <div>Hey look im working</div>
        </div>
      </LoginContext.Provider>
    </>
  );
}

export default App;
