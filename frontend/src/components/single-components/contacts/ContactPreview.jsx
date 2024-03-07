import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ContactPreview({ contact, usersChats }) {
  const navigate = useNavigate();

  const startNewChat = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: "/api/chats/new-chat",
        withCredentials: true,
        data: {
          userToChatWith: contact.id,
        },
      });
      const data = response.data;

      if (data.chatCreated) {
        navigate(`/messages/${data.chatId}`);
      }
    } catch (error) {
      console.log("Error starting new chat:", error);
    }
  };

  // check if the current contact already has a chat with the user
  const contactId = contact.id;
  const currentContactChatExist = usersChats.some((chat) =>
    chat.users.some((user) => user.id === contactId)
  );

  // Find the chat that has the current user.
  // Needs to be .some because .find expects a true
  const currentContactChat = usersChats.find((chat) =>
    chat.users.some((user) => user.id === contactId)
  );

  const currentContactChatId = currentContactChat?.id;

  // Remove contact handler function
  const handleRemoveContact = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "DELETE",
        url: `/api/contacts/${contact.id}/remove-contact`,
        withCredentials: true,
      });
    } catch (error) {
      console.log("Error removing contact:", error);
    }
  };

  return (
    <>
      <div className="contactPreview">
        <div className="profilePicture">
          <img src="" alt="" />
        </div>
        <div className="contactPreviewName">
          <p>{contact.username}</p>
        </div>
        <div className="contactPreviewMessage">
          {/* <p>{contact.messages.content}</p> */}
          {/* need to update so it gets the lastMessage from the chat */}
          <p>{currentContactChat.lastMessageFormatted}</p>
        </div>
        {currentContactChatExist ? (
          <Link to={`/messages/${currentContactChatId}`}>Go to chat</Link>
        ) : (
          <div className="startChatButton">
            <button onClick={startNewChat}>Start Chat</button>
          </div>
        )}
        <div className="removeContactButton">
          <button onClick={handleRemoveContact}>Remove contact</button>
        </div>
      </div>
    </>
  );
}
