import { useState, useEffect } from "react";
import ContactsComponent from "./GetAllContacts";
import ContactDetails from "./ContactDetails";
import { FiArrowRight, FiArrowDown} from "react-icons/fi";
import { IoIosTrash } from "react-icons/io";
import DeleteContact from "./DeleteContact";
const DisplayContacts = ({contacts, setContacts}) => {
  
  const [selectedContact, setSelectedContact] = useState(null);


  const handleContactClick = (contact) => {
    // If the clicked contact is already selected, deselect it
    setSelectedContact((prevSelected) =>
      prevSelected && prevSelected._id === contact._id ? null : contact
    );
  };

  const handleContactUpdate = (updatedContact) => {
    setContacts((prevContacts) =>
    prevContacts.map((c) => (c._id === updatedContact._id ? updatedContact : c))
  )
  }
  
  const handleDeleteClick = async (e, contact) => {
    e.stopPropagation();
    try {
      await DeleteContact({ contact });
       // Call the DeleteContact function and await its execution
      // You can update the UI or do any other actions after successful deletion
      setContacts((prevContacts) =>
        prevContacts.filter((c) => c._id !== contact._id)
      );
    } catch (error) {
      // Handle any errors that might occur during the deletion process
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <>
      <div className="flex flex-grow items-center justify-center">
        <div className="flex flex-col items-center w-full md:w-full lg:w-1/3 overflow-x-clip h-screen shadow-md bg-neutral-900">
          {contacts.map((contact) => (
            <div key={contact._id} className="p-4 mt-2 min-w-full">
              <div className="border border-neutral-700 shadow-md shadow-lime-600 bg-black text-gray-200 rounded-2xl min-w-full h-12 cursor-pointer flex items-center justify-between p-4">
              <button onClick={() => handleContactClick(contact)} className="w-full">
              <div className="flex items-center">
                <div className="mr-2">
                  {selectedContact && selectedContact._id === contact._id ? (
                    <FiArrowDown/> // Downward arrow
                  ) : (
                    <FiArrowRight />
                  )}
                </div>
                <div>
                  {contact.firstName} {contact.lastName}
                </div>
              </div>
              </button>
              <button className="border border-gray-700 shadow-md shadow-indigo-400 rounded-full hover:transform hover:scale-110 p-1"
                onClick={(e) => handleDeleteClick(e, contact)}>
                <IoIosTrash size={21} /> {/* Trash icon */}
              </button>
            </div>             
              <div>
                {selectedContact && selectedContact._id === contact._id && (
                  <ContactDetails contact={contact} onContactUpdate={handleContactUpdate}  />
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
