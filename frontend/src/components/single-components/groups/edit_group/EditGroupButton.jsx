import { Link } from "react-router-dom";

export default function EditGroupButton() {
  return (
    <div className="editGroupButton">
      <Link to={`edit`}>
        <button>Edit group</button>
      </Link>
    </div>
  );
}
