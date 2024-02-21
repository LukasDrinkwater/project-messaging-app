import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Import components
import Chat from "../single-components/chats/Chat";
import NewMessageForm from "../single-components/forms/NewMessageForm";

export default function ChatPage() {
  const { chatId } = useParams();
  const [chatMessages, setChatMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  // useEffect to get the chat from the url :chatId which comes from starting a new chat
  useEffect(() => {
    const getChat = async () => {
      console.log("trig");
      try {
        const response = await axios({
          method: "GET",
          url: `/api/chats/${chatId}`,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("er");
        console.log(response);
        // if reponse good assign data to state
        if (response.data?.chatMessages.length > 0) {
          setChatMessages(response.data.chatMessages);
          setUserId(response.data.userId);
        }

        // if bad show error
      } catch (error) {
        console.log("Error getting specfic chat:", error);
      }
    };

    getChat();
  }, []);

  return (
    <>
      <div className="chatPageContainer">
        {/* render component for chat. */}
        {!chatMessages ? (
          <div>Loading Chat</div>
        ) : (
          <Chat chatMessages={chatMessages} userId={userId} />
        )}
        <NewMessageForm />
        <div>ChatPage</div>
      </div>
    </>
  );
}
