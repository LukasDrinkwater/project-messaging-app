import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import GroupChat from "../single-components/groups/GroupChat";
import NewGroupMessageForm from "../single-components/forms/NewGroupMessageForm";
import EditGroupButton from "../single-components/groups/edit_group/EditGroupButton";
import GroupUsers from "../single-components/groups/GroupUsers";

import "./GroupChatPage.css";

export default function GroupChatPage() {
  const { groupId } = useParams();
  const [groupChatMessages, setGroupChatMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [groupChatName, setGroupChatName] = useState("");
  const [groupChatUsers, setGroupChatUsers] = useState([]);
  // newGroupMessagePosted triggered a rerender when the user has posted a new message
  const [newGroupMessagePosted, setNewGroupMessagePosted] = useState(false);

  // useEffect, api request, get the group from the url :groupId

  useEffect(() => {
    const getGroupchat = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `/api/groups/${groupId}`,
          withCredentials: true,
        });

        setGroupChatMessages(response.data.groupChatMessages);
        setUserId(response.data.userId);
        setGroupChatName(response.data.groupChat.name);
        setGroupChatUsers(response.data.groupChat.users);
      } catch (error) {
        console.log("Error getting specific group chat:", error);
      }
    };

    getGroupchat();
  }, [newGroupMessagePosted]);

  return (
    <>
      <div className="groupChatContainer">
        {groupChatMessages ? (
          <GroupChat
            groupChatMessages={groupChatMessages}
            userId={userId}
            groupChatName={groupChatName}
          />
        ) : (
          <p>Loading group chat...</p>
        )}
        <NewGroupMessageForm
          newGroupMessagePosted={newGroupMessagePosted}
          setNewGroupMessagePosted={setNewGroupMessagePosted}
        />
        <EditGroupButton />
        <GroupUsers groupUsers={groupChatUsers} />
      </div>
    </>
  );
}
