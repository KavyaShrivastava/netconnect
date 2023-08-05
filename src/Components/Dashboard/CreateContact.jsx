import { useState } from "react";
import EditableField from "./EditableFields";

const CreateContact = ({ setDisplayNewContactForm, setNewContact, setCreatedContactIsClicked}) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [company, setCompany] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phone, setPhone] = useState("");



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

    try{
        const response = await fetch ("http://localhost:8000/api/v1/contact/create", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(newContact),
        })
        if(response.ok){
          setNewContact(newContact); // Assuming the server returns the created contact
          setDisplayNewContactForm(false);
          setCreatedContactIsClicked(true)
        }
    }
    catch(err){
        console.error("Error occurred while creating contact:", err);
    }

  };

  return (
    <>
      <div className="flex flex-col self-center border p-2 border-gray-700 shadow-lg shadow-lime-700 lg:w-1/3 rounded-md mt-8 bg-black">
        <div className="pl-3 pt-2">
          <EditableField
            labelName={`firstName`}
            labelText="First Name:"
            defaultValue={firstName}
            onUpdate={setFirstName}
          />
          <EditableField
            labelName={`lastName`}
            labelText="Last Name:"
            defaultValue={lastName}
            onUpdate={setLastName}
          />
          <EditableField
            labelName={`email`}
            labelText="Email:"
            defaultValue={email}
            onUpdate={setEmail}
          />
          <EditableField
            labelName={`linkedIn`}
            labelText="LinkedIn:"
            defaultValue={linkedIn}
            onUpdate={setLinkedIn}
          />
          <EditableField
            labelName={`company`}
            labelText="Company:"
            defaultValue={company}
            onUpdate={setCompany}
          />
          <EditableField
            labelName={`occupation`}
            labelText="Occupation:"
            defaultValue={occupation}
            onUpdate={setOccupation}
          />
          <div className="mb-4">
            <EditableField
              labelName={`phone`}
              labelText="Phone:"
              defaultValue={phone}
              onUpdate={setPhone}
            />
          </div>
        </div>
        <div className="flex items-end justify-end mb-3">
          <button
            onClick={handleOnClickCancel}
            className="px-4 py-2 rounded-3xl cursor-pointer border border-white bg-lime-300 text-black transform hover:scale-105 duration-300 ease-out mr-2"
          >
            Cancel
          </button>

          <button
            onClick={handleCreateContact}
            className="px-4 py-2 rounded-3xl cursor-pointer border border-white bg-lime-300 text-black transform hover:scale-105 duration-300 ease-out"
          >
            Create Contact
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateContact;
