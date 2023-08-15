import { FaPlus } from 'react-icons/fa';
import CreateContact from './CreateContact';
import { useState, useEffect } from 'react';
import DisplayContacts from './DisplayContacts';
import LogoutButton from '../Authentication/Logout';

const Header = () => {

  const [displayNewContact, setDisplayNewContactForm] = useState(false)
  const [createdContactIsClicked, setCreatedContactIsClicked] = useState(false);
  const [newContact, setNewContact] = useState(null);
  const [contacts, setContacts] = useState([]);


  const handleNewContact = () =>{
    setDisplayNewContactForm((displayNewContact)=> !displayNewContact);
  }

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/contact", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setContacts(data.contacts);
        } else {
          console.log("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      }
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    if (createdContactIsClicked) {
      setContacts((prevContacts) => [...prevContacts, newContact]);
      setDisplayNewContactForm(false)
      setCreatedContactIsClicked(false)
      setNewContact([]); // Reset the flag
    }
  }, [createdContactIsClicked, newContact, contacts]);

  return (
    <>
    <div className='flex flex-col items-center w-full'>
      <div className='flex flex-row justify-between items-center bg-black lg:w-1/3 w-full h-20 pl-6 rounded-2xl shadow-lg shadow-indigo-900 pr-6 focus:outline-none'>
        <h1 className='mr-4 text-xl text-white'>All Connections</h1>
        <button
          className='text-white rounded-full p-3 shadow-lg border border-gray-700 focus:outline-none transform hover:scale-110 transition-transform duration-300 '
          onClick={handleNewContact}
        >          
        <FaPlus size={14} />
        </button>
      </div>
      </div>
      {displayNewContact  && (
        <CreateContact setDisplayNewContactForm={setDisplayNewContactForm} setNewContact={setNewContact} setCreatedContactIsClicked = {setCreatedContactIsClicked}/>
      )}
      <div className= "flex-grow focus:outline-none">
        <DisplayContacts contacts={contacts} setContacts={setContacts}/>
      </div>
      </>

     

  );
};

export default Header;
