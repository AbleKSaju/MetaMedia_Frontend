import React from "react";
import Aside from "../../components/HomeComponent/Aside";
import MainBody from "../../components/HomeComponent/MainBody";
import Story from "../../components/HomeComponent/Story";
import Suggestion from "../../components/HomeComponent/Suggestion";

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

export default Home;
