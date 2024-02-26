import { Link } from "react-router-dom";

export default function EditGroupButton({ groupId }) {
  return (
    <>
      <div className="editGroupButton">
        <Link to={`${groupId}/edit`}>
          <button>Edit group</button>
        </Link>
      </div>
    </>
  );
}
