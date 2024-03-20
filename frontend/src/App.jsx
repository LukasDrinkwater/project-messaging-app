import { useState, createContext, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

// import context
import LoginContext from "./components/context/LoginContext.jsx";

import "./App.css";

// Import component pages
import Layout from "./components/single-components/single_use/Layout";
import Footer from "./components/single-components/single_use/Footer";
import Header from "./components/single-components/single_use/Header";
import LoginPage from "./components/pages/LoginPage";
import MessagesPage from "./components/pages/MessagesPage";
import ChatPage from "./components/pages/ChatPage";
import SignUpPage from "./components/pages/SignUpPage";
import ContactsPage from "./components/pages/ContactsPage";
import GroupPage from "./components/pages/GroupPage";
import GroupChatPage from "./components/pages/GroupChatPage";
import GroupEditPage from "./components/pages/GroupEditPage";
import LandingPage from "./components/pages/LandingPage";

// Create context
// export const LoginContext = createContext();

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  const { setLoggedIn } = useContext(LoginContext);

  // runs on first page load. Initial load or after a user leaves and comes back to the
  // site and the session cookie still exists. Then updates loggedIn state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "/authentication/check-auth",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data.loggedIn === false) {
          setLoggedIn(false);
        } else {
          // setLoggedIn(true);
        }
      } catch (error) {
        console.log("Errors checking auth:", error);
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      {/* <LoginContext.Provider value={[loggedIn, setLoggedIn]}> */}
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public routes */}
            <Route path="/" element={LandingPage}></Route>
            <Route path="/login" element={LoginPage} />
            <Route path="/signup" element={SignUpPage} />

            {/* Protected routes */}
            <Route path="/messages" element={MessagesPage} />
            <Route path="/messages/:chatId" element={ChatPage} />
            <Route path="/contacts" element={ContactsPage} />
            <Route path="/groups" element={GroupPage} />
            <Route path="/groups/:groupId" element={GroupChatPage} />
            <Route path="/groups/:groupId/edit" element={GroupEditPage} />

            {/* Catch all */}
          </Route>
        </Routes>
      </div>
      <Footer />
      {/* </LoginContext.Provider> */}
    </>
  );
}

export default App;
