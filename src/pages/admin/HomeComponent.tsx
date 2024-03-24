import React from "react";
import UsersListComponent from "./UsersListComponent";
import PostListComponents from "./PostListComponents";
import { Route, Routes } from "react-router-dom";
import AsideComponent from "../../pages/admin/AsideComponent";

const HomeComponent = () => {
  return (
    <>
      <div className="fixed w-screen h-screen bg-[#ece9f0] flex justify-center items-center ">
        <div className="w-full h-full flex flex-col-reverse sm:flex-row justify-start overflow-y-auto ">
          <AsideComponent />
          <Routes>
            <Route path="/users" element={<UsersListComponent />} />
            <Route path="/posts" element={<PostListComponents />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
