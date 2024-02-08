import { useState, createContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";

// Create context
export const LoginContext = createContext();

// Import component pages
import Footer from "./components/single-components/single_use/Footer";
import Header from "./components/single-components/single_use/Header";
import LoginPage from "./components/pages/LoginPage";
import MessagesPage from "./components/pages/MessagesPage";
import SignUpPage from "./components/pages/SignUpPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // runs on first page load. Initial load or after a user leaves and comes back to the
  // site and the session cookie still exists. Then updates loggedIn state

  // useEffect(() => {
  //   const checkIfLoggedIn = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:3000/authentication/check-auth",
  //         {
  //           credentials: "include",
  //           mode: "cors",
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       if (response.ok) {
  //         const data = await response.json();
  //         if (data.loggedIn) {
  //           setLoggedIn(true);
  //         } else {
  //           // Redirect to login page
  //         }
  //       }
  //     } catch (error) {
  //       console.log("Error checking logged in status:", error);
  //     }
  //   };
  //   checkIfLoggedIn();
  // });

  return (
    <>
      <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" Component={MessagesPage}></Route>

            <Route path="/login" Component={LoginPage}></Route>
            <Route path="/signup" Component={SignUpPage}></Route>
            <Route path="/messages" Component={MessagesPage}></Route>
          </Routes>
        </div>
        <Footer />
      </LoginContext.Provider>
    </>
  );
}

export default App;
