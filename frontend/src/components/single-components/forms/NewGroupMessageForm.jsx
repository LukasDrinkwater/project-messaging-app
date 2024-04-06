import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function NewGroupMessageForm({
  newGroupMessagePosted,
  setNewGroupMessagePosted,
}) {
  const { groupId } = useParams();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  // sender
  // group
  // content

  const handleNewGroupMessageSubmit = async (e) => {
    e.preventDefault();

    // form data to allow image to also be sent because of multer
    const formData = new FormData();
    formData.append("content", message);
    formData.append("groupId", groupId);
    formData.append("image", image);

    try {
      await axios({
        method: "POST",
        url: "/api/message/new-group-message",
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
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
            <label htmlFor="image">Add media.</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
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
