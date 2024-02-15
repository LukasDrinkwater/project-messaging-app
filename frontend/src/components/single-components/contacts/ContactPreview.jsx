import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ContactPreview({ contact, usersChats }) {
  const navigate = useNavigate();
  // console.log(contact);

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

  const currentContactChat = usersChats.find((chat) =>
    chat.users.filter((user) => user.id === contactId)
  );
  const currentContactChatId = currentContactChat.id;

  // console.log(currentContactChatId);

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
          <p>{contact.messages.content}</p>
        </div>
        {currentContactChatExist ? (
          <Link to={`/messages/${currentContactChatId}`}>Go to chat</Link>
        ) : (
          <div className="startChatButton">
            <button onClick={startNewChat}>Start Chat</button>
          </div>
        )}
        <div className="editContactButton">
          <button>EDIT CONTACT</button>
        </div>
      </div>
    </>
  );
}
