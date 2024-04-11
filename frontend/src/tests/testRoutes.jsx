// import Layout from "./components/single-components/single_use/Layout";
// import Footer from "./components/single-components/single_use/Footer";
// import Header from "./components/single-components/single_use/Header";
import LoginPage from "./components/pages/LoginPage";
import MessagesPage from "./components/pages/MessagesPage";
import ChatPage from "./components/pages/ChatPage";
import SignUpPage from "./components/pages/SignUpPage";
import ContactsPage from "./components/pages/ContactsPage";
import GroupPage from "./components/pages/GroupPage";
import GroupChatPage from "./components/pages/GroupChatPage";
import GroupEditPage from "./components/pages/GroupEditPage";
import LandingPage from "./components/pages/LandingPage";
import EditProfilePage from "./components/pages/EditProfilePage.jsx";

const routes = [
  {
    path: "/landing-page",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/messages",
    element: <MessagesPage />,
  },
  {
    path: "/messages/:chatId",
    element: <ChatPage />,
  },
  {
    path: "/contacts",
    element: <ContactsPage />,
  },
  {
    path: "/contacts/edit-profile",
    element: <EditProfilePage />,
  },
  {
    path: "/groups",
    element: <GroupPage />,
  },
  {
    path: "/groups/:groupId",
    element: <GroupChatPage />,
  },
  {
    path: "/groups/:groupId/edit",
    element: <GroupEditPage />,
  },
  // {
  //   path: "",
  //   element: ,
  // },
  // {
  //   path: "",
  //   element: ,
  // },
  // {
  //   path: "",
  //   element: ,
  // },
  // {
  //   path: "",
  //   element: ,
  // },
];

export default routes;
