import ContactsComponent from "./GetAllContacts";

const DeleteContact = async ({ contact }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/contact/${contact._id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};

export default DeleteContact;
