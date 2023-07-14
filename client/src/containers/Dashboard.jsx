import React from "react";
import DbLeftSection from "../components/DbLeftSection";
import DbRightSection from "../components/DbRightSection";

const Dashboard = () => {
  return (
    <div className='w-screen h-screen flex bg-primary'>
      <DbLeftSection />
      <DbRightSection />
    </div>
  );
};

export default Dashboard;
