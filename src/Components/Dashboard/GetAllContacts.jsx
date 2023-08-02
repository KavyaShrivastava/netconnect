// ContactsComponent.js
import { useState, useEffect } from "react";

const ContactsComponent = () => {
  const [contacts, setContacts] = useState([]);

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

  useEffect(() => {
    getAllContacts();
  }, []);

  return contacts;
};

export default ContactsComponent;
