import { useState } from "react";
import NewSideBar from "./newUi/Sidebar";
import MainBody from "./newUi/Main";
import Suggetions from "./newUi/Suggetions";
import { Route, Routes } from "react-router-dom";
import Posts from "./newUi/Posts";
import Notification from "./newUi/Notification";
import Search from "./newUi/Search";
const NewModel = () => {
  const [createIndex, setCreateIndex] = useState(1);
  const [sideBarIndex, setsideBarIndex] = useState(1);

  return (
    <>
      <div className="fixed w-screen h-screen bg-[#ece9f0] flex justify-center items-center">
        <div className="w-full h-full flex flex-col-reverse sm:flex-row justify-between overflow-y-auto ">
          <NewSideBar
            sideBarIndex={sideBarIndex}
            setsideBarIndex={setsideBarIndex}
          />

          {/* <Notification  /> */}
          {/* <Search/> */}
          <Routes>
            <Route
              path="/"
              element={
                <MainBody
                  createIndex={createIndex}
                  setCreateIndex={setCreateIndex}
                />
              }
            />
            <Route path="/post" element={<Posts />} />
          </Routes>

          <Suggetions />
        </div>
      </div>
    </>
  );
};

export default NewModel;
