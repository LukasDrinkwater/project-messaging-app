import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Import components
import Chat from "../single-components/chats/Chat";

export default function ChatPage() {
  const { chatId } = useParams();
  const [chat, setChat] = useState([]);
  const [userId, setUserId] = useState(null);
  // useEffect to get the chat from the url :chatId which comes from starting a new chat
  useEffect(() => {
    const getChat = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `/api/chats/${chatId}`,
          withCredentials: true,
        });

        // console.log(response);
        // if reponse good assign data to state
        if (response.data.chat) {
          setChat(response.data.chat);
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
      {/* render component for chat. */}
      {!chat ? <div>Loading Chat</div> : <Chat chat={chat} userId={userId} />}

      <div>ChatPage</div>
    </>
  );
}
