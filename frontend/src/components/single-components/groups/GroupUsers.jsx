export default function GroupUsers({
  groupUsers,

  createGroup = false,
}) {
  console.log(groupUsers);
  return (
    <>
      <div className="groupUsersContainer">
        group users
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
