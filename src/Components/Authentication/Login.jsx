import { useState } from 'react';
import { loginFields } from "../../constants/formFields";
import Input from "./Input";

const fields=loginFields;

const fieldsState = {}
fields.forEach(field => {fieldsState[field.id] = "" });
console.log(fieldsState)

const LogIn = () => {
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
        console.log(loginState)
    }


    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser(loginState);
    }

    const authenticateUser = async(loginState) =>{
        try {
            const response = await fetch('http://localhost:8000/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginState)
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            await response.json()
            .then((response)=> {
                localStorage.setItem("token", response.token)
            })
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }
    return(
        <form className="space-y-6 max-h-fit sm:w-full md:w-full lg:w-1/4">
            <div className="">
                {
                    fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
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
            <button onClick={handleSubmit} type='submit'
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10'>LogIn</button>
            </div>
        </form >
    )
    
}
export default LogIn