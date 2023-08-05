import { useState, useEffect } from "react";
import ContactsComponent from "./GetAllContacts";
import ContactDetails from "./ContactDetails";
import { FiArrowRight, FiArrowDown} from "react-icons/fi";
import { IoIosTrash } from "react-icons/io";

const DisplayContacts = ({contacts}) => {
  
  const [selectedContact, setSelectedContact] = useState(null);


  const handleContactClick = (contact) => {
    // If the clicked contact is already selected, deselect it
    setSelectedContact((prevSelected) =>
      prevSelected && prevSelected._id === contact._id ? null : contact
    );
  };

  return (
    <>
      <div className="flex flex-grow items-center justify-center">
        <div className="flex flex-col items-center w-full md:w-full lg:w-1/3 overflow-x-clip h-screen shadow-md bg-zinc-950">
          {contacts.map((contact) => (
            <div key={contact._id} className="p-4 mt-2 min-w-full">
              <button
                onClick={() => handleContactClick(contact)}
                className="border border-neutral-700 shadow-lg shadow-fuchsia-600 bg-black text-gray-200 rounded-2xl min-w-full h-12 cursor-pointer transform hover:scale-105 transition-transform duration-300 flex items-center justify-center"
              >
                <div className="flex items-center">
                  {contact.firstName} {contact.lastName}
                <div className="ml-2 flex items-center">
                  {selectedContact && selectedContact._id === contact._id ? (
                    <FiArrowDown/> // Downward arrow
                  ) : (
                    <FiArrowRight />
                  )}
                </div>
                </div>
                <button // New button container for the trash icon
                  className="flex items-center justify-end focus:outline-none" 
                >
                   {/* Trash icon */}
                </button>
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

export default DisplayContacts;
