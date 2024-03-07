import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

export default function EditGroupForm({
  currentGroupUsers,
  groupEdited,
  setGroupEdited,
}) {
  const { groupId } = useParams();
  const [groupName, setGroupName] = useState("");
  const [contactToAddId, setContactToAddId] = useState([]);
  // const [allContacts, setAllContacts] = useState([]);
  const [adableUsers, setAdableUsers] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const usersContactsResponse = await axios({
          method: "GET",
          url: "/api/contacts/users-contacts",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const groupDetailResponse = await axios({
          method: "GET",
          url: `/api/groups/${groupId}/details`,
          withCredentials: true,
        });

        const allContacts = usersContactsResponse.data.allContacts;

        const filteredContacts = allContacts.filter((contact) => {
          return !currentGroupUsers.some((user) => user.id === contact.id);
        });

        setAdableUsers(filteredContacts);
        setGroupName(groupDetailResponse.data.groupDetail.name);
      } catch (error) {
        console.log("Error getting contacts for group:", error);
      }
    };

    // Only run the function when currentGroupUsers is populated.
    // Stops it from rendering with all contacts and then again to show the ones not in the
    // group.
    if (currentGroupUsers.length > 0) {
      getContacts();
    }
    // currentGroupUsers needs to be in the dependency array because its a state and async
    //  from the api request in the parent component
  }, [currentGroupUsers, groupEdited]);

  const handleAddUserClick = () => {
    console.log(contactToAddId);

    const userAlreadyAdded = currentGroupUsers.some(
      (user) => user.id === contactToAddId
    );
    if (userAlreadyAdded) return;

    // Find contact in the allContacts array
    const contactBeingAdded = adableUsers.find(
      (contact) => contact.id === contactToAddId
    );
    if (contactBeingAdded === undefined) return;

    handleAddUserApiRequest(contactToAddId);
  };

  const handleAddUserApiRequest = async (contactId) => {
    try {
      await axios({
        method: "PATCH",
        url: `api/groups/${groupId}/users/${contactId}/add-user`,
        withCredentials: true,
      });

      setGroupEdited(!groupEdited);
    } catch (error) {
      console.log("Error adding user to group:", error);
    }
  };

  const handleUpdateGroupName = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "PATCH",
        url: `api/groups/${groupId}/update-name`,
        withCredentials: true,
        data: { groupName },
      });
    } catch (error) {
      console.log("Error saving new group name:", error);
    }
  };

  return (
    <>
      <div className="editGroupContainer">
        <form>
          <div className="formGroup">
            <label htmlFor="groupName">Group name. </label>
            <input
              type="text"
              name="groupName"
              id="groupname"
              placeholder="Add a group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <button onClick={handleUpdateGroupName}>Update group name</button>
          </div>

          <div className="addUserFormContainer">
            <div className="formGroup">
              <label htmlFor="">Add Users</label>
              <select
                name="addContacts"
                id="addContacts"
                onChange={(e) => setContactToAddId(e.target.value)}
              >
                <option>Select a user</option>
                {adableUsers.map((contact) => {
                  return (
                    <option key={contact.id} value={contact.id}>
                      {contact.username}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              type="button"
              className="addUserButton"
              onClick={handleAddUserClick}
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
