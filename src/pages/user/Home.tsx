import { useEffect, useState } from "react";

import MainBody from "../../components/HomeComponent/MainBodyComponent";
import Main from "./newUi/Main"

import Search from "../../components/HomeComponent/SearchComponent";
import Message from "../../components/HomeComponent/MessageComponent/MessageComponent";
import Post from "../../components/HomeComponent/PostComponent";
import Profile from "../../components/HomeComponent/ProfileComponents/ProfileComponent";
import Settings from "./Settings";
import { Route, Routes, useLocation } from "react-router-dom";
import StoryModal from "../../components/HomeComponent/StoryComponent/StoryModal";
import ShowStoryComponent from "../../components/HomeComponent/StoryComponent/ShowStoryComponent";
import { useDispatch, useSelector } from "react-redux";
import { addStory, deleteAllStory } from "../../utils/ReduxStore/Slice/storySlice";
import { getStoriesFunction } from "../../utils/api/methods";
import MainModalBorderPost from "../../components/HomeComponent/PostComponent/Modal/mainModalBorderPost";
import NewSideBar from "./newUi/Sidebar";
import Suggetions from "./newUi/Suggetions";

import SearchComponent from "./newUi/Search";
import Notification from "./newUi/Notification";
import { StoreUserData } from "../../utils/costumHook/constumHook";
import { editUser } from "../../utils/ReduxStore/Slice/userSlice";
import { getUserByIdFuntion } from "../../utils/api/methods/UserService/post";


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
  const [openSearch, setOpenSearch] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [isgoLive,setIsGoLive]=useState(false)
  const dispatch = useDispatch()
  const location = useLocation();
  const userData=useSelector((state:any)=>state.persisted.user.userData)

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

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getUserByIdFuntion(userData.userId);
          if (response?.status) {            
            dispatch(editUser(response.data.socialConections));
          } else {
            throw new Error("Failed to fetch user data");
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, [dispatch, userData.userId]);
  
  const allowedPaths = ["/", "/post"];
 console.log("I AM HOME");
 
  return (
    <>
 {addStories && <StoryModal setAddStory={setAddStories}/>}
 {showStory?.length!=0 && <ShowStoryComponent showStory={showStory} setShowStory={setShowStory} deleteStory={deleteStory} setDeleteStory={setDeleteStory}/>}

 {isAddLive &&  (<CreateLive setIsAddLive={setIsAddLive} setIsGoLive={setIsGoLive}/>)}
 

 <div className="fixed w-screen h-screen bg-[#ece9f0] flex justify-center items-center ">

    <div className="w-full h-full flex flex-col-reverse sm:flex-row justify-start overflow-y-auto ">
        <NewSideBar setOpenNotification={setOpenNotification} setOpenSearch={setOpenSearch}/> 
        {openSearch && <SearchComponent setOpenSearch={setOpenSearch}/>}
        {openNotification && <Notification setOpenNotification={setOpenNotification}/>}
          {isAddPost && ( <MainModalBorderPost setRender={setRender} render={render} setIsAddPost={setIsAddPost} addPost={addPost} setAddPost={setAddPost} /> )}
          {isgoLive &&  (<Golive />)}
            <Routes>
                  <Route path="/message/:user_id" element={<Message />} />
                  <Route path="/" element={<Main setShowStory={setShowStory} setAddStory={setAddStories} setIsAddPost={setIsAddPost} setIsAddLive={setIsAddLive}/>} />
                  <Route path="/search" element={<Search setSidebarOpen={setSidebarOpen}/>} />
                  <Route path="/post" element={<Post setSidebarOpen={setSidebarOpen}/>} />
                  <Route path="/profile/:user_id" element={<Profile setRender={setRender} render={render}/>} />
                  <Route path="/notification" element={<Notification setSidebarOpen={setSidebarOpen}/>} />
                  <Route path="/settings/*" element={<Settings  />} />
                  <Route path="/room/:roomId" element={<Golive  />}/>

            </Routes>
          {allowedPaths.includes(location.pathname) && <Suggetions />}
    </div>
  </div>
    </>
  );
};

export default Home;