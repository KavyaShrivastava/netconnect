import { useEffect, useState } from "react";
import LogoutButton from "../Authentication/Logout";
import ContactsComponent from "./GetAllContacts";
import EditableField from "./EditableFields";
import ContactDetails from "./ContactDetails";

const Dashboard = () => {
  const contacts = ContactsComponent();
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactClick = (contact) => {
    // If the clicked contact is already selected, deselect it
    setSelectedContact((prevSelected) =>
      prevSelected && prevSelected._id === contact._id ? null : contact
    );
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center h-full w-full md:w-1/2 lg:w-1/3">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="p-4 mt-2 min-w-full"
            >
              <button onClick={() => handleContactClick(contact)} className="border border-purple-500 rounded-2xl min-w-full h-10 cursor-pointer transform hover:scale-105 transition-transform duration-300">
                {contact.firstName} {contact.lastName}{" "}
                {selectedContact && selectedContact._id === contact._id ? (
                  <span>&#x25BC;</span> // Downward arrow
                ) : (
                  <span>&#x25B6;</span> // Right-facing arrow
                )}
              </button>
              <div
                className={`${
                  selectedContact && selectedContact._id === contact._id
                    ? "transition-all ease-in duration-300 max-h-full opacity-100"
                    : "transition-all ease-out duration-300 max-h-0 opacity-0"
                }`}
              >
                {selectedContact && selectedContact._id === contact._id && (
                  <ContactDetails contact={contact} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
