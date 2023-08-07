import ContactsComponent from "./GetAllContacts"

const DeleteContact = async({contact}) => {

    const response = await fetch(`http://localhost:8000/api/v1/contact/${contact._id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem('token')
        }
    })
}

export default DeleteContact