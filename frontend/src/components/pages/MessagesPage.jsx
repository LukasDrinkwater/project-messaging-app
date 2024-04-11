import axios from "axios";
import { Link } from "react-router-dom";
// import "./MessagesPage.css";
import MessagesPageCss from "./MessagesPage.module.css";
import { useEffect, useState } from "react";

//Import components
import ChatPreview from "../single-components/chats/ChatPreview";

export default function MessagesPage() {
  const [matchedChats, setMatchedChats] = useState([]);

  useEffect(() => {
    const getCurrentChats = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "/api/chats/all-users-chats",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data.allChats?.length > 0) {
          setMatchedChats(response.data.matchedChats);
        }
      } catch (error) {
        console.log("Error getting all chats:", error);
      }
    };
    getCurrentChats();
  }, []);

  return (
    <>
      <div className={MessagesPageCss.messagePageContainer}>
        {/* <div className="currentChats"> */}
        <div
          className={`${MessagesPageCss.currentChats} ${MessagesPageCss.addCursorPointer}`}
        >
          {matchedChats.length > 0 ? (
            // map through chats to show a preview
            <>
              {matchedChats.map((chat) => (
                <ChatPreview key={chat.chatId} chat={chat} />
              ))}
            </>
          ) : (
            <>
              <p>
                You dont have any chats, click Start New Chat to get chatting!
              </p>
            </>
          )}
        </div>
        <div className={MessagesPageCss.messageFeed}>
          {/* map and display messages */}
        </div>
        <div className="newChatButton">
          <Link to={"/contacts"}>
            <button>Start new chat</button>
          </Link>
        </div>
      </div>
    </>
  );
}
