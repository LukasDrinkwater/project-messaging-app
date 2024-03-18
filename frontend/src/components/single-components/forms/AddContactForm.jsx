import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddContactForm() {
  const navigate = useNavigate();
  const [usernameToAdd, setUsernameToAdd] = useState("");
  const [error, setError] = useState("");

  const handleAddContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: `/api/contacts/add`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          usernameToAdd,
        },
      });
      console.log(response);

      if (response.data.foundUser) {
        // console.log("found user", response);
        navigate("/messages");
      }
    } catch (error) {
      setError(error.response.data);
      setTimeout(() => {
        setError("");
      }, 3000);
      console.log("Error adding contact:", error);
    }
  };

  return (
    <>
      <div className="addContactForm">
        <form action="">
          <div className="formGroup">
            <label htmlFor="usernameToAdd"> Username:</label>
            <input
              type="text"
              name="usernameToAdd"
              id="usernameToAdd"
              placeholder=""
              value={usernameToAdd}
              onChange={(e) => setUsernameToAdd(e.target.value)}
            />
          </div>
          <button onClick={handleAddContactSubmit}>Add contact</button>
        </form>
        {error && (
          <div className="errorContainer">
            <p>{error}</p>
          </div>
        )}
      </div>
    </>
  );
}
