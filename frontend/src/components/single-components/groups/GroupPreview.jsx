import { Link } from "react-router-dom";
import EditGroupButton from "./EditGroupButton";

export default function GroupPreview({ group }) {
  return (
    <>
      <Link to={`${group.id}`}>
        <div className="groupPreview">
          <div className="groupName">
            <p>{group.name}</p>
          </div>
          <div className="groupLastMessage">
            <p>{group.lastMessage}</p>
          </div>
          <EditGroupButton groupId={group.id} />
        </div>
      </Link>
    </>
  );
}
