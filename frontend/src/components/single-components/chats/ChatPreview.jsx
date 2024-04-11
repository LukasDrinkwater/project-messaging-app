import { useNavigate } from "react-router-dom";
import MessagesPageCss from "../../pages/MessagesPage.module.css";

export default function ChatPreview({ chat }) {
  const navigate = useNavigate();

  const handleGoToChatClick = () => {
    navigate(`${chat.chatId}`);
  };

  return (
    <>
      <div
        className={`${MessagesPageCss.chatPreviewContainer} ${MessagesPageCss.addCursorPointer}`}
        onClick={handleGoToChatClick}
      >
        <p>{chat.contact.username}</p>
        <p>{chat.lastMessageFormatted}</p>
        <p>Last message: {chat.updatedAtFormatted}</p>
      </div>
    </>
  );
}
