import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditGroupUsers({
  currentGroupUsers,
  groupEdited,
  setGroupEdited,
}) {
  const { groupId } = useParams();

  const handleRemoveUserClick = async (userId) => {
    // api request to remove the user from the group

    try {
      const response = await axios({
        method: "DELETE",
        url: `/api/groups/${groupId}/users/${userId}/remove-user`,
        withCredentials: true,
      });
      setGroupEdited(!groupEdited);
      console.log(response.data);
    } catch (error) {
      console.log("Error removing user from group:", error);
    }
  };
  return (
    <div>
      <div className="editGroupUsers">
        <div className="groupUsersHeading">
          <h2>Current users</h2>
        </div>
        {currentGroupUsers.map((user) => (
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
      </div>
    </div>
  );
}
