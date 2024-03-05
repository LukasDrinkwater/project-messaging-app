import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function NewMessageForm({
  newMessagePosted,
  setNewMessagePosted,
}) {
  const { chatId } = useParams();
  const [message, setMessage] = useState("");
  // sender
  // receiver
  // group - not requried
  // content

  const handleNewMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "/api/message/new-message",
        withCredentials: true,
        data: {
          content: message,
          chatId: chatId,
        },
      });

      // set newMessagPosted to opposite
      setNewMessagePosted(!newMessagePosted);
      setMessage("");
    } catch (error) {
      console.log("Error submitting new message form:", error);
    }
  };
  return (
    <>
      <div className="newMessageFormContainer">
        <form onSubmit={handleNewMessageSubmit}>
          <div className="formGroup">
            <label htmlFor="content">Message</label>
            <input
              type="text"
              name="content"
              id="content"
              placeholder=""
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <button type="submit">Send message</button>
          </div>
        </form>
      </div>
    </>
  );
}
