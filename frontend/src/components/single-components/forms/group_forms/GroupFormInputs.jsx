export default function GroupFormInputs() {
  return (
    <>
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
        <div className="addUserFormContainer">
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
          <button
            type="button"
            className="addUserButton"
            onClick={handleAddUserClick}
          >
            Add User
          </button>
        </div>
        <button type="submit">Create Group</button>
      </form>
    </>
  );
}
