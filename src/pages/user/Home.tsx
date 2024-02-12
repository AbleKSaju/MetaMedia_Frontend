import { useEffect, useState } from "react";
import Sidebar from "../../components/HomeComponent/SidebarComponent";
import MainBody from "../../components/HomeComponent/MainBodyComponent";
import Search from "../../components/HomeComponent/SearchComponent";
import Message from "../../components/HomeComponent/MessageComponent";
import Post from "../../components/HomeComponent/PostComponent";
import Profile from "../../components/HomeComponent/ProfileComponents/ProfileComponent";
import Create from "../../components/HomeComponent/CreateComponent";
import Notification from "../../components/HomeComponent/NotificationComponent";
import Footer from "../../components/HomeComponent/FooterComponent";
import Settings from "./Settings";
import { Route, Routes } from "react-router-dom";
import AsideComponent from "../../components/HomeComponent/AsideComponent";
import { useSelector } from "react-redux";
import StoryModal from "../../components/HomeComponent/CreateCOmponents/StoryModal";



export interface SetSidebarOpenFunction {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [addStory, setAddStory] = useState<boolean>(false);

  console.log(addStory,"addStoryaddStoryaddStoryaddStory");
  
 
  return (
    <>


 {/* {addStory && <StoryModal setAddStory={setAddStory}/>} */}
 {addStory && <StoryModal setAddStory={setAddStory}/>}
        <AsideComponent sidebarOpen={sidebarOpen} setAddStory={setAddStory}/>
    <Routes>
      {/* <Route path="/" element={<AsideComponent setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} sidebaropen={sidebaropen}/>} > */}
          <Route path="/" element={<MainBody setSidebarOpen={setSidebarOpen}/>} />
          <Route path="/search" element={<Search setSidebarOpen={setSidebarOpen}/>} />
          <Route path="/message" element={<Message setSidebarOpen={setSidebarOpen}/>} />
          <Route path="/post" element={<Post setSidebarOpen={setSidebarOpen}/>} />
          <Route path="/profile" element={<Profile setSidebarOpen={setSidebarOpen}/>} />
          <Route path="/notification" element={<Notification setSidebarOpen={setSidebarOpen}/>} />
          <Route path="/settings/*" element={<Settings setSidebarOpen={setSidebarOpen} />} />
      {/* </Route> */}
    </Routes>


    </>
  );
};

export default Home;
