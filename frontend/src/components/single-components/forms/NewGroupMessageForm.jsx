import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function NewGroupMessageForm({
  newGroupMessagePosted,
  setNewGroupMessagePosted,
}) {
  const { groupId } = useParams();
  const [message, setMessage] = useState("");

  // sender
  // group
  // content

  const handleNewGroupMessageSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: "/api/message/new-group-message",
        withCredentials: true,
        data: {
          content: message,
          groupId: groupId,
        },
      });

      setNewGroupMessagePosted(!newGroupMessagePosted);
      setMessage("");
    } catch (error) {
      console.log("Error posting new group chat message:", error);
    }
  };

  return (
    <>
      <div className="newGroupMessageFormContainer">
        <form onSubmit={handleNewGroupMessageSubmit}>
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
            <button type="submit"> Send Message</button>
          </div>
        </form>
      </div>
    </>
  );
}
