import { useState } from "react";
import EditableField from "./EditableFields";

const CreateContact = ({
  setDisplayNewContactForm,
  setNewContact,
  setCreatedContactIsClicked,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [company, setCompany] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phone, setPhone] = useState("");

  const fields = [
    {name: 'firstName', label: 'First Name:', state: [firstName, setFirstName] },
    {name: 'lastName', label: 'Last Name:', state: [lastName, setLastName]},
    {name: 'email', label: 'Email', state: [email, setEmail]},
    {name: 'linkedIn', label: 'LinkedIn', state: [linkedIn, setLinkedIn]},
    {name: 'company', label: 'Company', state: [company, setCompany]},
    {name: 'occupation', label: 'Occupation', state: [occupation, setOccupation]},
    {name: 'phone', label: 'Phone', state: [phone, setPhone]}
    
  ]

  const handleOnClickCancel = () => {
    setDisplayNewContactForm(false);
  };

  const handleCreateContact = async () => {
    // Check if the required fields (firstName and lastName) are not empty before creating the contact
    if (!firstName || !lastName) {
      alert("First Name and Last Name are required to create the contact.");
      return;
    }

    // Send the newContact request here using the entered data (firstName, lastName, email, etc.)
    const newContact = {
      firstName,
      lastName,
      email,
      linkedIn,
      company,
      occupation,
      phone,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/contact/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(newContact),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const createdContact = data.contact;
        console.log(createdContact);
        setNewContact(createdContact); // Assuming the server returns the created contact
        setDisplayNewContactForm(false);
        setCreatedContactIsClicked(true);
      }
    } catch (err) {
      console.error("Error occurred while creating contact:", err);
    }
  };

  return (
    <>
      <div className="flex flex-col self-center border p-2 border-gray-700 shadow-lg shadow-indigo-700 lg:w-1/3 w-full md:w-3/4 rounded-md mt-8 bg-transparent">
        <div className="pl-3 pt-2">
         {fields.map(({ name, label, state }) => (
            <EditableField
              key={name}
              labelName={name}
              labelText={label}
              defaultValue={state[0]}
              onUpdate={state[1]}
            />
          ))}
        </div>
        <div className="flex items-end justify-end mb-3">
          <button
            onClick={handleOnClickCancel}
            className="px-4 py-2 rounded-3xl cursor-pointer border border-white bg-white text-black transform hover:scale-105 duration-300 ease-out mr-2"
          >
            Cancel
          </button>

          <button
            onClick={handleCreateContact}
            className="px-4 py-2 rounded-3xl cursor-pointer border border-white bg-white text-black transform hover:scale-105 duration-300 ease-out"
          >
            Create Contact
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateContact;
