import { Link } from "react-router-dom";

export default function GroupPreview({ group }) {
  return (
    <>
      <div className="groupPreview">
        <Link to={`${group.id}`}>
          <div className="groupName">
            <p>{group.name}</p>
          </div>
          <div className="groupLastMessage">
            {group.lastMessageFormatted ? (
              <p>{group.lastMessageFormatted}</p>
            ) : (
              <p>No messages, be the first to send a message.</p>
            )}
          </div>
        </Link>
      </div>
    </>
  );
}
