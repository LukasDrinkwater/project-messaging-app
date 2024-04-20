// import Layout from "./components/single-components/single_use/Layout";
// import Footer from "./components/single-components/single_use/Footer";
// import Header from "./components/single-components/single_use/Header";
import LoginPage from "../components/pages/LoginPage.jsx";
import MessagesPage from "../components/pages/MessagesPage.jsx";
import ChatPage from "../components/pages/ChatPage.jsx";
import SignUpPage from "../components/pages/SignUpPage.jsx";
import ContactsPage from "../components/pages/ContactsPage.jsx";
import GroupPage from "../components/pages/GroupPage.jsx";
import GroupChatPage from "../components/pages/GroupChatPage.jsx";
import GroupEditPage from "../components/pages/GroupEditPage.jsx";
import LandingPage from "../components/pages/LandingPage.jsx";
import EditProfilePage from "../components/pages/EditProfilePage.jsx";

const routes = [
  // {
  //   path: "/landing-page",
  //   element: <LandingPage />,
  // },
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  // },
  // {
  //   path: "/signup",
  //   element: <SignUpPage />,
  // },
  {
    path: "/messages",
    element: <MessagesPage />,
  },
  {
    path: "/messages/:chatId",
    element: <ChatPage />,
  },
  // {
  //   path: "/contacts",
  //   element: <ContactsPage />,
  // },
  // {
  //   path: "/contacts/edit-profile",
  //   element: <EditProfilePage />,
  // },
  // {
  //   path: "/groups",
  //   element: <GroupPage />,
  // },
  // {
  //   path: "/groups/:groupId",
  //   element: <GroupChatPage />,
  // },
  // {
  //   path: "/groups/:groupId/edit",
  //   element: <GroupEditPage />,
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
  // {
  //   path: "",
  //   element: ,
  // },
];

export default routes;
