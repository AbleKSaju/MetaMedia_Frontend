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
import { useDispatch } from "react-redux";
import { addStory } from "../../utils/ReduxStore/Slice/storySlice";
import { getStoriesFunction } from "../../utils/api/methods";



export interface SetSidebarOpenFunction {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [addStories, setAddStories] = useState<boolean>(false);
  // const [showStoryCount,setShowStoryCount] = useState(-1)
  const [showStory,setShowStory] = useState(-1)
  const dispatch = useDispatch()
  console.log(showStory,"showStoryshowStoryshowStory");
  
  useEffect(()=>{
    (async ()=>{
     const response:any = await getStoriesFunction()
     console.log(response,"responseresponse");
     console.log(response?.data?.data?.content?.story,"responseresponse");
     
     if(response?.data?.status){
      dispatch(addStory(response?.data?.data?.content?.story));
     }
    })();
  },[])
 
  return (
    <>

 {addStories && <StoryModal setAddStory={setAddStories}/>}
 {showStory >= 0 && <ShowStoryComponent setShowStory={setShowStory}/>}
        <AsideComponent sidebarOpen={sidebarOpen} setAddStory={setAddStories}/>
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
