import React, { useState } from "react";
import AsideComponent from "../../components/SettingsComponent/AsideComponent";
import { Contactus, EditProfile, Security } from "../../components";
import { SetSidebarOpenFunction } from "./Home";
import { Route, Routes } from "react-router-dom";

const Settings: React.FC<SetSidebarOpenFunction> = ({ setSidebarOpen }) => {
  const [selectedSettings, setSelectedSettings] = useState(0);

  setSidebarOpen(false);
  return (
    <>
        <div className= "sm:ml-0 flex  sm:flex">
    <div className="flex w-[400px]  overflow-hidden ">
   
      <AsideComponent />
        </div>
      <Routes>
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/security" element={<Security />} />
        <Route path="/contactUs" element={<Contactus />} />
        <Route path="/editProfile" element={<EditProfile />} />
      </Routes>
         </div>
    </>
  );
};

export default Settings;
