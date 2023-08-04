import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const CreateNewContact = () => {

    const [addContactForm, setAddContactForm] = useState(false)

    const handleAddContact = () =>{
        

    }




  return (
    <div className='flex flex-col items-center md:w-full sm:min-w-max lg:w-screen'>
      <div className=' mt-3 flex flex-row justify-between items-center bg-zinc-700 rounded-xl bg-opacity-80 lg:w-1/3 sm:w-full h-20 px-9 shadow-lg shadow-neutral-900'>
        <h1 className='mr-4 text-white text-lg'>All Contacts</h1>
        <button
          className='text-white rounded-full p-3 shadow-lg shadow-black focus:outline-none transform hover:scale-105 transition-transform duration-300 '
          onClick={() => {
            // Add your logic to open the "create new contact" form here
          }}
        >
          <FaPlus size={16} />
        </button>
      </div>
      </div>

  );
};

export default CreateNewContact;
