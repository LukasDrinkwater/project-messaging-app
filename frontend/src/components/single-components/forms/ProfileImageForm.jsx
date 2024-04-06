import { useState } from "react";
import axios from "axios";

export default function ProfileImageForm() {
  const [image, setImage] = useState(null);

  const handleAddImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", e.target.elements.image.files[0]); // Get the first file from the input field

    console.log("test");
    const response = await axios({
      method: "POST",
      url: "/api/contacts/add-profile-image",
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
      },
      data: formData,
    });

    console.log(response);
  };

  return (
    <>
      <div className="addImageForm">
        <form onSubmit={handleAddImage}>
          <div className="formGroup">
            <label htmlFor="image">Upload a profile</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>
    </>
  );
}
