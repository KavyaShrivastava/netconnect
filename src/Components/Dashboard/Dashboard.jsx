import React from "react";
import Header from "./Header";
import LogoutButton from "../Authentication/Logout";


const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
       <LogoutButton />
      <div className="flex flex-col h-max w-full">
      <Header />
      </div>
    </div>
  );
};

export default Dashboard;
