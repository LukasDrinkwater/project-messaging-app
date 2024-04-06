import axios from "axios";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState("");

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "/api/contacts/profile",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        setUserProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile();
  }, []);

  return (
    <>
      <div className="userProfileContainer"></div>
    </>
  );
}
