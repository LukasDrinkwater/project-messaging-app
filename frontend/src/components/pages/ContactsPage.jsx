import { useEffect, useState, useContext } from "react";
import LoginContext from "../context/LoginContext";
import "./ContactPage.css";
import axios from "axios";

// Import components
import AddContactForm from "../single-components/forms/AddContactForm";
import ContactPreview from "../single-components/contacts/ContactPreview";

export default function ContactsPage() {
  const [addContact, setAddContact] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [usersChats, setUsersChats] = useState([]);

  // Destructure the state and set state for loggedIn
  // const { loggedIn, setLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    // console.log("trigger");

    const getAllContacts = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "/api/contacts/users-contacts",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        setAllContacts(response.data.allContacts);
        setUsersChats(response.data.usersChats);
      } catch (error) {
        console.log("Error getting contacts:", error);
      }
    };
    // only run the api request is the user isnt on the add contact form
    if (!addContact) {
      getAllContacts();
    }
  }, [addContact]);

  return (
    <>
      <div className="contactPageContainer">
        <div className="allContacts">
          {addContact ? (
            <AddContactForm />
          ) : (
            /* map through contacts and make a preview */

            <>
              {allContacts.length > 0 &&
                allContacts.map((contact) => (
                  <ContactPreview
                    key={contact.id}
                    contact={contact}
                    usersChats={usersChats}
                  />
                ))}
            </>
          )}
        </div>
        {!addContact && (
          <div className="addContactButton">
            {/* <Link to="add">ADD NEW CONTACT</Link> */}
            <button
              onClick={() => {
                setAddContact((prevState) => !prevState);
              }}
            >
              GO TO ADD CONTACTS
            </button>
          </div>
        )}
      </div>
    </>
  );
}
// {
//   allContacts &&
//     allContacts.map((contact) => (
//       <ContactPreview key={contact.id} contact={contact} />
//     ));
// }
