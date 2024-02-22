import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MessagesPage.css";
import { useEffect, useState } from "react";

//Import components
import ChatPreview from "../single-components/chats/ChatPreview";

export default function MessagesPage() {
  const navigate = useNavigate();
  // const [userReceiver, setUserReceiver] = useState(undefined);
  // const [currentChats, setCurrnentChats] = useState([]);
  // const [allUserChats, setAllUserChats] = useState([]);
  // const [usersContacts, setUsersContacts] = useState([]);
  const [matchedChats, setMatchedChats] = useState([]);

  useEffect(() => {
    console.log("trig");
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

        console.log(response.data.matchedChats);

        if (response.data.allChats?.length > 0) {
          // setAllUserChats(response.data.allChats);
          // setUsersContacts(response.data.usersContacts);
          setMatchedChats(response.data.matchedChats);
        }
      } catch (error) {
        console.log("Error getting all chats:", error);
      }
    };
    getCurrentChats();
  }, []);

  const handleNewChatClick = () => {
    navigate("/contacts");
  };

  return (
    <>
      <div className="messagePageContainer">
        <div className="currentChats">
          {matchedChats.length > 0 ? (
            // map through chats to show a preview
            <>
              {matchedChats.map((chat) => (
                <ChatPreview key={chat.chatId} chat={chat} />
              ))}
              <p>chat previews</p>
            </>
          ) : (
            // render new chat button
            <>
              <p>
                You dont have any chats, click Start New Chat to get chatting!
              </p>
            </>
          )}
        </div>
        <div className="messageFeed">
          {/* map and display messages */}
          <p>messages</p>
        </div>
        <div className="newChatButton">
          <button onClick={handleNewChatClick}>Start new chat</button>
        </div>
      </div>
    </>
  );
}
