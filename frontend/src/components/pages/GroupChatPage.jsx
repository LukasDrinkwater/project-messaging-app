import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import GroupChat from "../single-components/groups/GroupChat";

export default function GroupChatPage() {
  const { groupId } = useParams();
  const [groupChatMessages, setGroupChatMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [groupChatName, setGroupChatName] = useState("");

  // useEffect, api request, get the group from the url :groupId

  useEffect(() => {
    const getGroupchat = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `/api/groups/${groupId}`,
        });

        setGroupChatMessages(response.data.groupChatMessages);
        setUserId(response.data.userId);
        setGroupChatName(response.data.groupChatName);
      } catch (error) {
        console.log("Error getting specific group chat:", error);
      }
    };

    getGroupchat();
  }, []);

  return (
    <>
      <div className="groupChatContinaer">
        {groupChatMessages ? (
          <GroupChat
            groupChatMessages={groupChatMessages}
            userId={userId}
            groupChatName={groupChatName}
          />
        ) : (
          <p>Loading group chat...</p>
        )}
      </div>
    </>
  );
}
