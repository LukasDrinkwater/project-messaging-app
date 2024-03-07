import { useNavigate } from "react-router-dom";

export default function ChatPreview({ chat }) {
  const navigate = useNavigate();
  // Find the chat that has the current user.
  // Needs to be .some because .find expects a true

  // if contact and chat arent linked into an array in the backend
  // you can do this istead
  // const currentContact = usersContacts.find((contact) =>
  // chat.users.some((user) => user.id === contact.id)
  // );

  const handleGoToChatClick = () => {
    navigate(`${chat.chatId}`);
  };

  // Cursor pointer is set in App.css
  return (
    <>
      <div
        className="chatPreiewContainer addCursorPointer"
        onClick={handleGoToChatClick}
      >
        <p>{chat.contact.username}</p>
        <p>{chat.lastMessageFormatted}</p>
        <p>Last message: {chat.updatedAtFormatted}</p>
      </div>
    </>
  );
}
