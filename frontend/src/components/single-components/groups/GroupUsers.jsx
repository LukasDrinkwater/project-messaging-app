export default function GroupUsers({
  groupUsers,

  createGroup = false,
}) {
  return (
    <>
      <div className="groupUsersContainer">
        <p>Current users in the group chat:</p>
        {!createGroup ? (
          <>
            {groupUsers?.length > 0 ? (
              groupUsers.map((user) => (
                <div className="groupContact" key={user.id}>
                  <p>{user.username}</p>
                </div>
              ))
            ) : (
              <p>Group is empty</p>
            )}
          </>
        ) : (
          <>
            {groupUsers?.length > 0 ? (
              groupUsers.map((user) => (
                <>
                  <link to={`/contacts/:contactId/edit`}>
                    <div className="groupContact" key={user.id}>
                      <p>{user.username}</p>
                    </div>
                  </link>
                </>
              ))
            ) : (
              <p>Group is empty</p>
            )}
          </>
        )}
      </div>
    </>
  );
}
