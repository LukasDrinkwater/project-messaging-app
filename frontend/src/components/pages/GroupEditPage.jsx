import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import EditGroupUsers from "../single-components/groups/edit_group/EditGroupUsers";
import EditGroupForm from "../single-components/forms/group_forms/EditGroupForm";

export default function GroupEditPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  // State to rerender when a user is added
  const [groupEdited, setGroupEdited] = useState(false);
  const [currentGroupUsers, setCurrentGroupUsers] = useState([]);

  useEffect(() => {
    const getAllGroupUsers = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `/api/groups/${groupId}/users`,
          withCredentials: true,
        });

        console.log(response.data);
        setCurrentGroupUsers(response.data.allGroupUsers);
      } catch (error) {
        console.log("Error getting all group users when editing group", error);
      }
    };

    getAllGroupUsers();
  }, [groupEdited]);

  return (
    <>
      <div className="editGroupContainer">
        <div className="editGroupBackButton">
          <button onClick={() => navigate(-1)}>Back to group chat.</button>
        </div>
        <EditGroupUsers
          currentGroupUsers={currentGroupUsers}
          groupEdited={groupEdited}
          setGroupEdited={setGroupEdited}
        />
        <EditGroupForm
          currentGroupUsers={currentGroupUsers}
          groupEdited={groupEdited}
          setGroupEdited={setGroupEdited}
        />
      </div>
    </>
  );
}
