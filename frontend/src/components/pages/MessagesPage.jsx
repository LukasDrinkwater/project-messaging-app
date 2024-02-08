import axios from "axios";
import "./MessagesPage.css";
import { useEffect, useState } from "react";

export default function Messages() {
  const [userReceiver, setUserReceiver] = useState(undefined);

  useEffect(() => {
    const getCurrentChats = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "/messages/allChats",
          credentials: "true",
        });

        if (response.ok) {
        }
      } catch (error) {
        console.log("Error getting all chats:", error);
      }
    };
    getCurrentChats();
  }, []);

  return (
    <>
      <div className="messagePageContainer">
        <div className="currentChats"></div>
        <div className="messageFeed">
          {/* map and display messages */}
          <p>messages</p>
        </div>
      </div>
    </>
  );
}
