import { useState } from 'react';
import { signupFields } from "../../constants/formFields"
import Input from "./Input";
import Modal from '../../Components/ModalTemplate'

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);

  const [showModal, setShowModal] = useState(false);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    createAccount(signupState)
  }

  //handle Signup API Integration here
  const createAccount=async(signupState)=>{
    const response = await fetch('http://localhost:8000/api/v1/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupState)
    })
    console.log(response)
  }

    return(
        <form className="mt-8 space-y-6" >
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <button onClick={handleSubmit} className= "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10">Sign Up</button>
        </div>

         

      </form>
    )
}