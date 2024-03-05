import { useState, createContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import "./App.css";

// Create context
export const LoginContext = createContext();

// Import component pages
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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

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
          setLoggedIn(true);
        }
      } catch (error) {
        console.log("Errors checking auth:", error);
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" Component={MessagesPage}></Route>

            <Route path="/login" Component={LoginPage} />
            <Route path="/signup" Component={SignUpPage} />
            <Route path="/messages" Component={MessagesPage} />
            <Route path="/messages/:chatId" Component={ChatPage} />
            <Route path="/contacts" Component={ContactsPage} />
            <Route path="/groups" Component={GroupPage} />
            <Route path="/groups/:groupId" Component={GroupChatPage} />
            <Route path="/groups/:groupId/edit" Component={GroupEditPage} />
            {/* <Route path="/groups/:groupId" Component={GroupChatPage}></Route> */}
            {/* <Route path="/contacts/add" ></Route> */}
          </Routes>
        </div>
        <Footer />
      </LoginContext.Provider>
    </>
  );
}

export default App;
