import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import EditGroupUsers from "../single-components/groups/edit_group/EditGroupUsers";
import EditGroupForm from "../single-components/forms/group_forms/EditGroupForm";

export default function GroupEditPage() {
  // const { groupId } = useParams();
  // const [allGroupUsers, setAllGroupUsers] = useState([]);

  // useEffect(() => {
  //   const getAllGroupUsers = async () => {
  //     try {
  //       const response = await axios({
  //         method: "GET",
  //         url: `/api/groups/${groupId}/users`,
  //         withCredentials: true,
  //       });

  //       console.log(response.data);
  //       setAllGroupUsers(response.data.allGroupUsers);
  //     } catch (error) {
  //       console.log("Error getting all group users when editing group", error);
  //     }
  //   };

  //   getAllGroupUsers();
  // }, []);

  // const handleRemoveUserClick = async (userId) => {
  //   // api request to remove the user from the group

  //   try {
  //     const response = await axios({
  //       method: "DELETE",
  //       url: `/api/groups/${groupId}/users/${userId}`,
  //       withCredentials: true,
  //     });

  //     console.log(response.data);
  //   } catch (error) {
  //     console.log("Error removing user from group:", error);
  //   }
  // };
  const { groupId } = useParams();
  const [currentGroupUsers, setAllGroupUsers] = useState([]);

  useEffect(() => {
    const getAllGroupUsers = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `/api/groups/${groupId}/users`,
          withCredentials: true,
        });

        // console.log(response.data);
        setAllGroupUsers(response.data.allGroupUsers);
      } catch (error) {
        console.log("Error getting all group users when editing group", error);
      }
    };

    getAllGroupUsers();
  }, []);

  return (
    <>
      <div className="editGroupContainer">
        <EditGroupUsers currentGroupUsers={currentGroupUsers} />
        <EditGroupForm currentGroupUsers={currentGroupUsers} />
        {/* <div className="editGroupUsers">
          {allGroupUsers.map((user) => (
            <div className="groupUser" key={user.id}>
              <div className="name">
                <p>{user.username}</p>
              </div>
              <div className="removeUserButton">
                <button onClick={() => handleRemoveUserClick(user.id)}>
                  Remove user
                </button>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
}
