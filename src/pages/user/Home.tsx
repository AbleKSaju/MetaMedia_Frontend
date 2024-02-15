import { useEffect, useState } from "react";
import MainBody from "../../components/HomeComponent/MainBodyComponent";
import Search from "../../components/HomeComponent/SearchComponent";
import Message from "../../components/HomeComponent/MessageComponent";
import Post from "../../components/HomeComponent/PostComponent";
import Profile from "../../components/HomeComponent/ProfileComponents/ProfileComponent";
import Notification from "../../components/HomeComponent/NotificationComponent";
import Settings from "./Settings";
import { Route, Routes } from "react-router-dom";
import AsideComponent from "../../components/HomeComponent/AsideComponent";
import StoryModal from "../../components/HomeComponent/StoryComponent/StoryModal";
import ShowStoryComponent from "../../components/HomeComponent/StoryComponent/ShowStoryComponent";



export interface SetSidebarOpenFunction {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [addStory, setAddStory] = useState<boolean>(false);
  // const [showStoryCount,setShowStoryCount] = useState(-1)
  const [showStory,setShowStory] = useState(-1)
  console.log(showStory,"showStoryshowStoryshowStory");
  
 
  return (
    <>


 {/* {addStory && <StoryModal setAddStory={setAddStory}/>} */}
 {addStory && <StoryModal setAddStory={setAddStory}/>}
 {showStory >= 0 && <ShowStoryComponent setShowStory={setShowStory}/>}
        <AsideComponent sidebarOpen={sidebarOpen} setAddStory={setAddStory}/>
    <Routes>
      {/* <Route path="/" element={<AsideComponent setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} sidebaropen={sidebaropen}/>} > */}
          <Route path="/" element={<MainBody setSidebarOpen={setSidebarOpen} setShowStory={setShowStory}/>} />
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
