import { FaPlus } from 'react-icons/fa';
import CreateContact from './CreateContact';
import { useState, useEffect } from 'react';
import DisplayContacts from './DisplayContacts';

const Header = () => {

  const [displayNewContact, setDisplayNewContactForm] = useState(false)
  const [createdContactIsClicked, setCreatedContactIsClicked] = useState(false);
  const [newContact, setNewContact] = useState([]);
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
      setCreatedContactIsClicked(false) // Reset the flag
    }
  }, [createdContactIsClicked, newContact, contacts]);

  return (
    <>
    <div className='flex flex-col items-center w-full'>
      <div className='flex flex-row justify-between items-center bg-zinc-700 bg-opacity-80 lg:w-1/3 w-full h-20 px-9 shadow-lg shadow-neutral-800'>
        <h1 className='mr-4 font-bold text-xl text-fuchsia-400'>All Contacts</h1>
        <button
          className='text-white rounded-full p-3 shadow-lg shadow-gray-950 border border-gray-700 focus:outline-none transform hover:scale-110 transition-transform duration-300 '
          onClick={handleNewContact}
        >          
        <FaPlus size={16} />
        </button>
      </div>
      </div>
      {displayNewContact  && (
        <CreateContact setDisplayNewContactForm={setDisplayNewContactForm} setNewContact={setNewContact} setCreatedContactIsClicked = {setCreatedContactIsClicked}/>
      )}
      <div className= "flex-grow">
        <DisplayContacts contacts={contacts}/>
      </div>
      </>

     

  );
};

export default Header;
