export default function GroupUsers({ groupUsers, setGroupUsers }) {
  console.log(groupUsers);
  return (
    <>
      <div className="groupUsersContainer">
        group users
        {groupUsers.length > 0 ? (
          groupUsers.map((user) => (
            <div className="groupContact" key={user.id}>
              <p>{user.username}</p>
            </div>
          ))
        ) : (
          <p>Group is empty</p>
        )}
        {/* show the current users in the group. */}
        {/* also have a conditional for removing them. */}
      </div>
    </>
  );
}
