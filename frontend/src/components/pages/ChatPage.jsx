import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ChatPage() {
  const { chatId } = useParams();
  // useEffect to get the chat from the url :chatId which comes from starting a new chat
  useEffect(() => {
    const getChat = async () => {
      try {
        const response = axios({
          method: "GET",
          url: `/api/chats/${chatId}`,
          withCredentials: true,
        });

        // if reponse good assign data to state

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
      <div>ChatPage</div>
    </>
  );
}
