import React, { useState } from "react";
import AsideComponent from "../../components/SettingsComponent/AsideComponent";
import { Contactus, EditProfile, Security } from "../../components";

interface SettingsProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Settings: React.FC<SettingsProps> = ({ setSidebarOpen }) => {

  const [selectedSettings,setSelectedSettings] = useState(0)

  const renderSettingsComponent = () => {

    switch (selectedSettings) {
      case 0:
        return <EditProfile />;
      // case 1:
      //   return <Search />;
      // case 2:
      //   return <Message />;
      case 2:
        return <Security />;
      // case 4:
      //   return <Profile />;
      case 4:
        return <Contactus />;
      // case 5:
      //   return <Notification />;
      // case 7:
      //   return <Settings />;
      default:
        return <EditProfile />;
    }
  };

  setSidebarOpen(false);
  return (
    <>
      <div className="flex overflow-hidden ">
        <div className="sm:w-96 lg:w-[400px]">
        <AsideComponent selectedSettings={selectedSettings} setSelectedSettings={setSelectedSettings}/>
        </div>
        <div className=" h-[98vh] hidden sm:flex justify-center sm:w-[100vw]">
        {renderSettingsComponent()}
        </div>
      </div>
    </>
  );
};

export default Settings;
