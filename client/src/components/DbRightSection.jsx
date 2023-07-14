import React from "react";
import { Route, Routes } from "react-router-dom";
import DbHeader from "./DbHeader";
import DbHome from "./DbHome";
import DbOrders from "./DbOrders";
import DbItems from "./DbItems";
import DbNewItem from "./DbNewItem";
import DbUsers from "./DbUsers";

const DbRightSection = () => {
  return (
    <div>
      <div className='flex flex-col py-12 px-12 flex-1 h-full'>
        <DbHeader />
        <div className='flex flex-col flex-1 overflow-y-scroll scrollbar-none '>
          <Routes>
            <Route path='/home' element={<DbHome />} />
            <Route path='/orders' element={<DbOrders />} />
            <Route path='/items' element={<DbItems />} />
            <Route path='/newItem' element={<DbNewItem />} />
            <Route path='/users' element={<DbUsers />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DbRightSection;
