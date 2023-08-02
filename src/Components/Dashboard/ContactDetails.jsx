import { useState } from "react";
import EditableField from "./EditableFields";

const ContactDetails = ({ contact }) => {
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  };

  return (
    <div className="flex flex-col border p-2 border-yellow-500 min-w-full rounded-2xl mt-8">
      {update ? (
        <div>
        <EditableField
          labelName={`email-${contact._id}`}
          labelText="Email:"
          defaultValue={contact.email}
        />
        <EditableField
          labelName={`LinkedIn-${contact._id}`}
          labelText="LinkedIn:"
          defaultValue={contact.linkedIn}
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
        </div>
      )}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 text-white rounded-3xl cursor-pointer border border-white hover:bg-yellow-300 hover:text-black"
        >
          {update ? "Save" : "Update"}
        </button>
      </div>
    </div>
  );
};

export default ContactDetails;
