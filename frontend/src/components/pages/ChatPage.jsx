import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ChatPage.css";

// Import components
import Chat from "../single-components/chats/Chat";
import NewMessageForm from "../single-components/forms/NewMessageForm";

export default function ChatPage() {
  const { chatId } = useParams();
  const [chatMessages, setChatMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [contact, setContact] = useState([]);
  // newMessagePosted triggered a rerender when the user has posted a new message
  const [newMessagePosted, setNewMessagePosted] = useState(false);

  // useEffect to get the chat from the url :chatId which comes from starting a new chat
  useEffect(() => {
    const getChat = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `/api/chats/${chatId}`,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        // if reponse good assign data to state
        if (response.data?.chatMessages.length > 0) {
          setChatMessages(response.data.chatMessages);
          setUserId(response.data.userId);
          setContact(response.data.contact.username);
        }

        // if bad show error
      } catch (error) {
        console.log("Error getting specfic chat:", error);
      }
    };

    getChat();
  }, [newMessagePosted]);

  return (
    <>
      <div className="chatPageContainer">
        {/* render component for chat. */}
        {!chatMessages ? (
          <p>Loading Chat</p>
        ) : (
          <Chat chatMessages={chatMessages} userId={userId} contact={contact} />
        )}
        <NewMessageForm
          newMessagePosted={newMessagePosted}
          setNewMessagePosted={setNewMessagePosted}
        />
      </div>
    </>
  );
}
