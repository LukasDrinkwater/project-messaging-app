import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MessagesPage.css";
import { useEffect, useState } from "react";

export default function Messages() {
  const navigate = useNavigate();
  const [userReceiver, setUserReceiver] = useState(undefined);
  const [currentChats, setCurrnentChats] = useState([]);

  // useEffect(() => {
  //   const getCurrentChats = async () => {
  //     try {
  //       const response = await axios({
  //         method: "GET",
  //         url: "/messages/allChats",
  //         credentials: "true",
  //       });

  //       if (response.ok) {
  //       }
  //     } catch (error) {
  //       console.log("Error getting all chats:", error);
  //     }
  //   };
  //   getCurrentChats();
  // }, []);

  const handleNewChatClick = () => {
    navigate("/contacts");
  };

  return (
    <>
      <div className="messagePageContainer">
        <div className="currentChats">
          {currentChats.length > 0 ? (
            // map through chats to show a preview
            <p>chat previews</p>
          ) : (
            // render new chat button
            <>
              <p>new chat</p>
              <div className="newChatButton">
                <button onClick={handleNewChatClick}>Start new chat</button>
              </div>
            </>
          )}
        </div>
        <div className="messageFeed">
          {/* map and display messages */}
          <p>messages</p>
        </div>
      </div>
    </>
  );
}
