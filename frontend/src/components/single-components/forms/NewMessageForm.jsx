import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function NewMessageForm({
  newMessagePosted,
  setNewMessagePosted,
}) {
  const { chatId } = useParams();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  // sender
  // receiver
  // group - not requried
  // content

  const handleNewMessageSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", message);
    formData.append("chatId", chatId);
    formData.append("image", image);

    try {
      await axios({
        method: "POST",
        url: "/api/message/new-message",
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
        },
        data: formData,
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
            <label htmlFor="image">Add media.</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
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
