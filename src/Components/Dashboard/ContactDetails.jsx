import { useState } from "react";
import EditableField from "./EditableFields";
import Tasks from "./Tasks/Tasks";

const ContactDetails = ({ contact, onContactUpdate, index }) => {
  const [update, setUpdate] = useState(false);
  const [updatedContact, setUpdatedContact] = useState(contact);
  const [displayContactTask, setDisplayContactTask] = useState(true);

  const handleUpdate = async () => {
    if (update) {
      // Only proceed if the button text is "Save" (i.e., update is true).
      try {
        // Send the request to the server using the Fetch API.
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/contact/update/${contact._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(updatedContact), // Use the updatedContact state here.
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update contact.");
        }
        const updatedContactData = await response.json();

        // Update the updatedContact state with the new data received from the server.
        onContactUpdate(updatedContactData.contact);
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
    <div
      className={`flex flex-col p-2 shadow-lg min-w-full rounded-2xl mt-8 border-2 border-black text-white bg-opacity-80 ${
        index % 4 === 0
          ? "shadow-fuchsia-400"
          : index % 4 === 1
          ? "shadow-orange-200 "
          : index % 4 === 2
          ? "shadow-violet-300"
          : "shadow-green-200"
      }`}
    >
      {update ? (
        <div className="pl-3 pt-2">
          <EditableField
            labelName={`firstName-${contact._id}`}
            labelText="First Name:"
            defaultValue={updatedContact.firstName}
            onUpdate={(value) => handleContactUpdate("firstName", value)}
          />
          <EditableField
            labelName={`lastName-${contact._id}`}
            labelText="Last Name:"
            defaultValue={updatedContact.lastName}
            onUpdate={(value) => handleContactUpdate("lastName", value)}
          />
          <EditableField
            labelName={`email-${contact._id}`}
            labelText="Email:"
            defaultValue={updatedContact.email}
            onUpdate={(value) => handleContactUpdate("email", value)}
          />
          <EditableField
            labelName={`linkedIn-${contact._id}`}
            labelText="LinkedIn:"
            defaultValue={updatedContact.linkedIn}
            onUpdate={(value) => handleContactUpdate("linkedIn", value)}
          />
          <EditableField
            labelName={`company-${contact._id}`}
            labelText="Company:"
            defaultValue={updatedContact.company}
            onUpdate={(value) => handleContactUpdate("company", value)}
          />
          <EditableField
            labelName={`occupation-${contact._id}`}
            labelText="Occupation:"
            defaultValue={updatedContact.occupation}
            onUpdate={(value) => handleContactUpdate("occupation", value)}
          />
          <EditableField
            labelName={`phone-${contact._id}`}
            labelText="Phone:"
            defaultValue={updatedContact.phone}
            onUpdate={(value) => handleContactUpdate("phone", value)}
          />
        </div>
      ) : (
        <div>
          <Tasks
            contact={contact}
            setDisplayContactTask={setDisplayContactTask}
          />
          {displayContactTask && (
            <div className="flex flex-col py-2 gap-2 pl-4 text-white">
              <p>Email: {updatedContact.email}</p>
              <p>
                LinkedIn:{" "}
                <a
                  href={updatedContact.linkedin}
                  className="text-blue-500 underline hover:no-underline cursor-pointer"
                >
                  {updatedContact.linkedIn}
                </a>
              </p>
              <p>Occupation: {updatedContact.occupation}</p>
              <p>Company: {updatedContact.company}</p>
              <p>Phone: {updatedContact.phone}</p>
            </div>
          )}
        </div>
      )}
      {displayContactTask && (
        <div className="flex flex-row justify-end mt-2 mr-2">
          <button
            onClick={update ? handleUpdate : handleToggleUpdate}
            className="px-4 py-2 text-white  rounded-3xl cursor-pointer border border-white hover:bg-white hover:text-black mb-3"
          >
            {update ? "Save" : "Update"}
          </button>
          {update && (
            <button
              onClick={handleToggleUpdate}
              className="px-4 py-2 mr-2 text-white rounded-3xl cursor-pointer border border-white hover:bg-white hover:text-black mb-3"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactDetails;
