import { useEffect, useState } from "react";
import axios from "axios";

import CreateGroupForm from "../single-components/forms/group_forms/CreateGroupForm";
import GroupUsers from "../single-components/groups/GroupUsers";
import GroupPreview from "../single-components/groups/GroupPreview";

export default function GroupPage() {
  // usestates to store the data
  const [addGroup, setAddGroup] = useState(false);
  const [usersGroups, setUsersGroups] = useState([]);
  // States for GroupUsers component
  const [groupUsers, setGroupUsers] = useState([]);

  // useffect to call the api request
  useEffect(() => {
    const getUserGroups = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "/api/groups/users-groups",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        setUsersGroups(response.data.usersGroups);
      } catch (error) {
        console.log("Error getting all user groups:", error);
      }
    };

    // Only run the useEffect if the addGroup state is false
    if (!addGroup) {
      getUserGroups();
    }
  }, [addGroup]);

  const handleCreateNewGroupButtonClick = () => {
    setAddGroup(!addGroup);
  };

  return (
    <>
      {/* loop through the groups */}
      <div>GroupPage</div>
      {/* button in Link to go to add group page */}
      {addGroup ? (
        <>
          <CreateGroupForm
            addGroup={addGroup}
            setAddGroup={setAddGroup}
            groupUsers={groupUsers}
            setGroupUsers={setGroupUsers}
          />
          <GroupUsers groupUsers={groupUsers} setGroupUsers={setGroupUsers} />
        </>
      ) : (
        <>
          <div className="groupPreviews">
            {usersGroups.map((group) => (
              <GroupPreview key={group.id} group={group} />
            ))}
          </div>
          <div className="addGroupButton">
            <button onClick={handleCreateNewGroupButtonClick}>
              Create a new group
            </button>
          </div>
        </>
      )}
    </>
  );
}
