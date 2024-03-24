import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { AllActivity,ChangePassword,BlockedUsers,Aside,EditProfile,AccountInformation } from "../../components/SettingsComponent";
const Settings = (  ) => {
  const [blockedUsers,setBlockedUsers] = useState(false)
  const [allActivity,setAllActivity] = useState(false)
  const [changePassword,setChangePassword] = useState(false)

  return (
    <>
      <div className="sm:ml-0 flex sm:flex">
        <div className="flex w-[400px]  overflow-hidden ">
          <Aside blockedUsers={blockedUsers} setBlockedUsers={setBlockedUsers} changePassword={changePassword} setChangePassword={setChangePassword} setAllActivity={setAllActivity} allActivity={allActivity}/>
          {blockedUsers && <BlockedUsers setBlockedUsers={setBlockedUsers}/>}
          {changePassword && <ChangePassword changePassword={changePassword} setChangePassword={setChangePassword}/>}
        </div>
        <Routes>
          <Route path="/" element={<EditProfile />} />
          <Route path="/accountInfo" element={<AccountInformation />} />
          <Route path="/allActivity/likes" element={<AllActivity />} />
          <Route path="/allActivity/comments" element={<AllActivity />} />
          <Route path="/allActivity/saved" element={<AllActivity />} />
        </Routes>
      </div>
    </>
  );
};

export default Settings;
