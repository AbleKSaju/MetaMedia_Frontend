import React from "react";
import MainBody from "../../components/HomeComponent/MainBody";
import Story from "../../components/HomeComponent/Story";
import Suggestion from "../../components/HomeComponent/Suggestion";
import Aside from "../../components/HomeComponent/Aside";

const Home = () => {
  return (
    <>
      <div className="flex-row flex overflow-auto">
        <Aside />
        <MainBody />
      </div>
    </>
  );
};


export default Home