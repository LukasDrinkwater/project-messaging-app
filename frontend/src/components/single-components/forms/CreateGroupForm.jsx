import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import GroupUsers from "../groups/GroupUsers";

export default function CreateGroupForm({
  addGroup,
  setAddGroup,
  groupUsers,
  setGroupUsers,
}) {
  const [groupName, setGroupName] = useState("");
  const [contactToAddId, setContactToAddId] = useState("");
  const [allContacts, setAllContacts] = useState([]);
  // const [groupUsers, setGroupUsers] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "/api/contacts/users-contacts",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);

        setAllContacts(response.data.allContacts);
      } catch (error) {
        console.log("Error getting contacts for group:", error);
      }
    };
    getContacts();
  }, []);

  const handleAddUserToGroupSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: "/api/groups/create-group",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          groupName,
          groupUsers,
        },
      });
    } catch (error) {
      console.log("Error adding user to group:", error);
    }
    // console.log(e.target.value);

    const contactToAddId = e.target.value;

    // If adding the user to the group was successfull, add the
    // user to the group users preview
    if (addGroup) {
      console.log(allContacts);
      const contactBeingAdded = allContacts.find(
        (contact) => contact.id === contactToAddId
      );

      setGroupUsers((prevArray) => [...prevArray, contactBeingAdded]);
    }
    console.log(groupUsers);
  };

  const handleBackToGroupsClick = () => {
    setAddGroup((prevState) => !prevState);
  };
  return (
    <>
      <div className="createGroupContainer">
        <div className="backButton">
          <Link to="/groups">
            <button onClick={handleBackToGroupsClick}>Back to groups</button>
          </Link>
        </div>
        <form onSubmit={handleAddUserToGroupSubmit}>
          <div className="formGroup">
            <label htmlFor="groupName"> </label>
            <input
              type="text"
              name="groupName"
              id="groupname"
              placeholder="Add a group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="">Add Users</label>
            <select
              name="addContacts"
              id="addContacts"
              onChange={(e) => setContactToAddId(e.target.value)}
            >
              <option>Select a user</option>
              {allContacts.map((contact) => {
                return (
                  <option key={contact.id} value={contact.id}>
                    {contact.username}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit">Add user</button>
        </form>
      </div>
      <div className="addedUsers">
        {/* <GroupUsers groupUsers={groupUsers} setGroupUsers={setGroupUsers} /> */}
      </div>
    </>
  );
}
