import { useState } from "react";
import { Link } from "react-router-dom";

import CreateGroupForm from "../single-components/forms/CreateGroupForm";
import GroupUsers from "../single-components/groups/GroupUsers";

export default function GroupPage() {
  // usestates to store the data
  const [addGroup, setAddGroup] = useState(false);
  // States for GroupUsers component
  const [groupUsers, setGroupUsers] = useState([]);

  // useffect to call the api request

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
        <div className="addGroupButton">
          <button onClick={handleCreateNewGroupButtonClick}>
            Create a new group
          </button>
        </div>
      )}
    </>
  );
}
