import AsideComponent from "../../components/SettingsComponent/AsideComponent";
import { Contactus, EditProfile, Security } from "../../components";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import BlockedUsers from "../../components/SettingsComponent/BlockedUsers";
import ChangePasswordComponent from "../../components/SettingsComponent/ChangePasswordComponent";
const Settings = (  ) => {
  const [blockedUsers,setBlockedUsers] = useState(false)
  const [changePassword,setChangePassword] = useState(false)

  return (
    <>
      <div className="sm:ml-0 flex sm:flex">
        <div className="flex w-[400px]  overflow-hidden ">
          <AsideComponent blockedUsers={blockedUsers} setBlockedUsers={setBlockedUsers} changePassword={changePassword} setChangePassword={setChangePassword}/>
          {blockedUsers && <BlockedUsers setBlockedUsers={setBlockedUsers}/>}
          {changePassword && <ChangePasswordComponent changePassword={changePassword} setChangePassword={setChangePassword}/>}
        </div>
        <Routes>
          <Route path="/" element={<EditProfile />} />
          <Route path="/accountInfo" element={<Security />} />
          <Route path="/contactUs" element={<Contactus />} />
          <Route path="/editProfile" element={<EditProfile />} />
        </Routes>
      </div>
    </>
  );
};

export default Settings;
