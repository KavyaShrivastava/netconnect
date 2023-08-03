import { useState, useEffect } from "react";
import EditableField from "./EditableFields";

const ContactDetails = ({ contact }) => {
  const [update, setUpdate] = useState(false);
  const [updatedContact, setUpdatedContact] = useState(contact);
  console.log("Contact prop:", contact);

  useEffect(() => {
    setUpdatedContact(contact);
  }, [contact]);

  const handleUpdate = async () => {
    if (update) {
      // Only proceed if the button text is "Save" (i.e., update is true).
      try {
        // Send the request to the server using the Fetch API.
        const response = await fetch(`http://localhost:8000/api/v1/contact/update/${contact._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),


          },
          body: JSON.stringify(updatedContact), // Use the updatedContact state here.
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update contact.");
        }
        const updatedContactData = await response.json();

        // Update the updatedContact state with the new data received from the server.
        setUpdatedContact(updatedContactData.contact);
  
        // If the request is successful, set the update state to false.
        setUpdate(false);
      } catch (error) {
        console.error("Error updating contact:", error.message);
        // Handle any error that occurred during the request.
        // You can show an error message or take any other appropriate action.
      }
    } else {
      // If the button text is not "Save" (i.e., update is false), you can perform any other action you need when the button text is not "Save."
      // For example, you might want to show a message to inform the user that they need to click "Update" first.
      console.log("Please click 'Update' first before saving the changes.");
    }
  };
  
  const handleContactUpdate = (fieldName, fieldValue) => {
    setUpdatedContact((prevContact) => ({
      ...prevContact,
      [fieldName]: fieldValue,
    }));
  };

  const handleToggleUpdate = () => {
    setUpdate((prevUpdate) => !prevUpdate);
  };

  //firstName, lastName, email, company, linkedIn, phone, occupation

  return (
    <div className="flex flex-col border p-2 border-yellow-500 min-w-full rounded-2xl mt-8">
      {update ? (
        <div>
        <EditableField
          labelName={`firstName-${contact._id}`}
          labelText="First Name:"
          defaultValue={contact.firstName}
          onUpdate={(value) => handleContactUpdate("firstName", value)}

        />
        <EditableField
          labelName={`lastName-${contact._id}`}
          labelText="Last Name:"
          defaultValue={contact.lastName}
          onUpdate={(value) => handleContactUpdate("lastName", value)}

        />
         <EditableField
          labelName={`email-${contact._id}`}
          labelText="Email:"
          defaultValue={contact.email}
          onUpdate={(value) => handleContactUpdate("email", value)}

        />
        <EditableField
          labelName={`linkedIn-${contact._id}`}
          labelText="LinkedIn:"
          defaultValue={contact.linkedIn}
          onUpdate={(value) => handleContactUpdate("linkedIn", value)}

        />
         <EditableField
          labelName={`company-${contact._id}`}
          labelText="Company:"
          defaultValue={contact.company}
          onUpdate={(value) => handleContactUpdate("company", value)}

        />
         <EditableField
          labelName={`occupation-${contact._id}`}
          labelText="Occupation:"
          defaultValue={contact.occupation}
          onUpdate={(value) => handleContactUpdate("occupation", value)}

        />
          <EditableField
          labelName={`phone-${contact._id}`}
          labelText="Phone:"
          defaultValue={contact.phone}
          onUpdate={(value) => handleContactUpdate("phone", value)}
        />
        </div>
      ) : (
        <div className="flex flex-col pl-3 pt-2 gap-2">
          <p>Email: {contact.email}</p>
          <p>
            LinkedIn:{" "}
            <a
              href={contact.linkedin}
              className="text-blue-500 underline hover:no-underline"
            >
              {contact.linkedIn}
            </a>
          </p>
          <p>
            Occupation: {contact.occupation}
          </p>
          <p>
            Company: {contact.company}
          </p>
          <p>
            Phone: {contact.phone}
          </p>
        </div>
      )}
      <div className="flex justify-end mt-4">
        <button
          onClick={update ? handleUpdate : handleToggleUpdate}
          className="px-4 py-2 text-white rounded-3xl cursor-pointer border border-white hover:bg-yellow-300 hover:text-black"
        >
          {update ? "Save" : "Update"}
        </button>
      </div>
    </div>
  );
};

export default ContactDetails;
