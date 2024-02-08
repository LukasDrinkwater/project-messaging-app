import { useState } from "react";
import axios from "axios";

export default function MessageForm({ userReceiver }) {
  // component states
  const [messageText, setMessageText] = useState("");
  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: `/api/messages/new-message/${userReceiver}`,
        credentials: "include",
      });
    } catch (error) {
      console.log("Error submiting new message");
    }
  };

  return (
    <>
      <div className="messageFormContainer">
        <form onSubmit={handleSubmitMessage}></form>
        <div className="formGroup">
          <label htmlFor="messageText">Message:</label>
          <input
            type="text"
            id="messageText"
            name="messageText"
            placeholder=""
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button type="submit">Send</button>
        </div>
      </div>
    </>
  );
}
