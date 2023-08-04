import React from "react";
import DisplayContacts from "./DisplayContacts";
import CreateNewContact from "./CreateNewContact";

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      <CreateNewContact />
      <div className= "flex-grow">
        <DisplayContacts />
      </div>
    </div>
  );
};

export default Dashboard;
