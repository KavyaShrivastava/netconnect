import { useState } from "react";
import { loginFields } from "../../constants/formFields";
import Input from "./Input";
import { loginErrorModalFields } from "../../constants/modalFields";
import Modal from "../ModalTemplate";
import { useNavigate } from "react-router-dom";

// Create a new constant 'fields' and assign it the value of 'loginFields'
const fields = loginFields;

// Create an empty object 'fieldsState' to store the initial state of form fields
const fieldsState = {};

// Populate the 'fieldsState' object with each field from the 'fields' array,
// setting their initial values to an empty string
fields.forEach((field) => {
  fieldsState[field.id] = "";
});

// Log the 'fieldsState' object to the console for debugging purposes

// Define a new functional component called 'LogIn'
const LogIn = () => {
  // Declare a state variable 'loginState' using the 'useState' hook,
  // initialized with the 'fieldsState' object as its initial value
  const [loginState, setLoginState] = useState(fieldsState);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Get the navigation function

  // Define a function 'handleChange' to handle changes in the form fields
  const handleChange = (e) => {
    // Update the 'loginState' with the new value entered in the form field,
    // using the 'id' of the input element as the key and the entered value as the value
    setLoginState({ ...loginState, [e.target.id]: e.target.value });

    // Log the updated 'loginState' to the console for debugging purposes
  };

  // Define a function 'handleSubmit' to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Call the 'authenticateUser' function and pass the current 'loginState' as an argument
    authenticateUser(loginState);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Define an asynchronous function 'authenticateUser' to handle user authentication
  const authenticateUser = async (loginState) => {
    try {
      // Send a POST request to the specified URL with the 'loginState' object as the request body
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginState),
        }
      );

      if (response.ok) {
        // Parse the response body as JSON and store the 'token' value in the local storage
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        // If the response status is not 2xx, an error occurred, so display the modal
        setShowModal(true);
      }
    } catch (error) {
      setShowModal(true);
    }
  };

  return (
    <>
      <form className="space-y-6 max-h-fit sm:w-full md:w-full lg:w-1/4">
        <div className="">
          {fields.map((field) => (
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
          ))}
          <button
            onClick={handleSubmit}
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          >
            LogIn
          </button>
        </div>
      </form>
      {showModal && (
        <Modal
          heading={loginErrorModalFields.heading}
          message="An error occurred during login."
          buttonColor={loginErrorModalFields.buttonColor}
          buttonText={loginErrorModalFields.buttonText}
          onClick={closeModal}
        />
      )}
    </>
  );
};
export default LogIn;
