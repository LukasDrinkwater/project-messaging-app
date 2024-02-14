import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ContactPreview({ contact, usersChats }) {
  const navigate = useNavigate();
  console.log(contact);

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

  console.log(usersChats);
  const contactId = contact.id;
  const currentContactChat = usersChats.some((chat) =>
    chat.users.some((user) => user._id === contactId)
  );

  // usersChats.find((chat) =>
  //   chat.users.some((user) => user.id === contactId)
  // );
  console.log(contact.username, currentContactChat);
  // const chatExists =

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
        {
          <div className="startChatButton">
            <button onClick={startNewChat}>Start Chat</button>
          </div>
        }
        <div className="editContactButton">
          <button>EDIT CONTACT</button>
        </div>
      </div>
    </>
  );
}
