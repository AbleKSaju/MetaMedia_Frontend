

import { useState } from "react";
import Sidebar from "../../components/HomeComponent/Sidebar";
import MainBody from "../../components/HomeComponent/MainBody";
import Search from "../../components/HomeComponent/SearchComponent";
import Message from "../../components/HomeComponent/MessageComponent";
import Post from "../../components/HomeComponent/PostComponent";
import Profile from "../../components/HomeComponent/ProfileComponent";
import Create from "../../components/HomeComponent/CreateComponent";
import Notification from "../../components/HomeComponent/NotificationComponent";

const Home = () => {

    const [selectedMenu, setSelectedMenu]:any = useState(0);


    const renderMainComponent = () => {
        switch (selectedMenu) {
          case 0:
            return <MainBody/>;
          case 1:
            return <Search/>;
          case 2:
            return<Message/>;
          case 3:
            return<Post/>;
          case 4:
            return<Profile/>;
          case 5:
            return<Create/>;
          case 6:
             return<Notification/>;
          default:
            return <MainBody/>;
        }
      };
   
  return (
    <>
      <div className="flex ">
        <div className="hidden sm:flex">
        <Sidebar setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />
        </div>
        <div className="h-screen flex-1 sm:p-7 ">
         {renderMainComponent()}
        </div>
      </div>
    </>
  );
};

export default Home;
