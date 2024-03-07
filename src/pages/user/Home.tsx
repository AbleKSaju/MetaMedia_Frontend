import { useEffect, useState } from "react";
import MainBody from "../../components/HomeComponent/MainBodyComponent";
import Main from "./newUi/Main"
import Search from "../../components/HomeComponent/SearchComponent";
import Message from "../../components/HomeComponent/MessageComponent/MessageComponent";
import Post from "../../components/HomeComponent/PostComponent";
import Profile from "../../components/HomeComponent/ProfileComponents/ProfileComponent";
import Notification from "../../components/HomeComponent/NotificationComponent";
import Settings from "./Settings";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import AsideComponent from "../../components/HomeComponent/AsideComponent";
import StoryModal from "../../components/HomeComponent/StoryComponent/StoryModal";
import ShowStoryComponent from "../../components/HomeComponent/StoryComponent/ShowStoryComponent";
import { useDispatch } from "react-redux";
import { addStory, deleteAllStory } from "../../utils/ReduxStore/Slice/storySlice";
import { getStoriesFunction } from "../../utils/api/methods";
import MainModalBorderPost from "../../components/HomeComponent/PostComponent/Modal/mainModalBorderPost";
import NewSideBar from "./newUi/Sidebar";
import Suggetions from "./newUi/Suggetions";
import CreateLive from "../../components/HomeComponent/liveComponent/CreateLive";
import Golive from "../../components/HomeComponent/liveComponent/goLive";


export interface SetSidebarOpenFunction {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Home = ({ render,setRender}:any) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [addStories, setAddStories] = useState<boolean>(false);
  const [deleteStory, setDeleteStory] = useState<boolean>(false);
  const [showStory,setShowStory] = useState("")
  const [isAddPost,setIsAddPost] = useState(false)
  const [isAddLive,setIsAddLive]=useState(false)
  const [addPost,setAddPost] = useState(false)
  const [isgoLive,setIsGoLive]=useState(false)
  const dispatch = useDispatch()
  const location = useLocation();

  useEffect(()=>{
    (async ()=>{
     const response:any = await getStoriesFunction()
     if(response?.data?.status){
      response.data.data.myStory=true
      dispatch(addStory(response?.data?.data));
     }else{
      dispatch(deleteAllStory());
     }
    })();
  },[addStories,deleteStory])

  const allowedPaths = ["/", "/post"];
 
  return (
    <>
 {addStories && <StoryModal setAddStory={setAddStories}/>}
 {showStory?.length!=0 && <ShowStoryComponent showStory={showStory} setShowStory={setShowStory} deleteStory={deleteStory} setDeleteStory={setDeleteStory}/>}
 {isAddLive &&  (<CreateLive setIsAddLive={setIsAddLive} setIsGoLive={setIsGoLive}/>)}
 {isgoLive &&  (<Golive />)}

 <div className="fixed w-screen h-screen bg-[#ece9f0] flex justify-center items-center ">
    <div className="w-full h-full flex flex-col-reverse sm:flex-row justify-start overflow-y-auto ">
        <NewSideBar />
 {/* <AsideComponent sidebarOpen={sidebarOpen} setAddStory={setAddStories}  setIsAddPost={setIsAddPost} isAddPost={isAddPost}/> */}
          {isAddPost && ( <MainModalBorderPost setRender={setRender} render={render} setIsAddPost={setIsAddPost} addPost={addPost} setAddPost={setAddPost} /> )}
         
            <Routes>
                  <Route path="/" element={<Main setShowStory={setShowStory} setAddStory={setAddStories} setIsAddPost={setIsAddPost} setIsAddLive={setIsAddLive}/>} />
                  <Route path="/search" element={<Search setSidebarOpen={setSidebarOpen}/>} />
                  <Route path="/message/*" element={<Message setSidebarOpen={setSidebarOpen}/>} />
                  <Route path="/post" element={<Post setSidebarOpen={setSidebarOpen}/>} />
                  <Route path="/profile/:user_id" element={<Profile setRender={setRender} render={render}/>} />
                  <Route path="/notification" element={<Notification setSidebarOpen={setSidebarOpen}/>} />
                  <Route path="/settings/*" element={<Settings setSidebarOpen={setSidebarOpen} />} />
            </Routes>
          {allowedPaths.includes(location.pathname) && <Suggetions />}
    </div>
  </div>
    </>
  );
};

export default Home;