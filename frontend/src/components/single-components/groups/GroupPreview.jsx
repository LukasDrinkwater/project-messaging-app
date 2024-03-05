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
            <p>{group.lastMessage}</p>
          </div>
        </Link>
      </div>
    </>
  );
}
