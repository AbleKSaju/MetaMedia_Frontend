import { useEffect, useState } from "react";
import PostsComponent from "../PostComponent/PostsComponent";
import { Edit } from "lucide-react";
import Highlight from "../HighlightComponent/HighlightComponent";
import { GetHighlightData } from "../../../utils/api/methods";
import profile from '../../../assets/profile.webp'
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FollowComponent from "./FollowComponent";
import AddHighlightComponent from "./AddHighlightComponent";
import HighlightListComponent from "../HighlightComponent/HighlightListComponent";
import { addHighlights, deleteHighlights } from "../../../utils/ReduxStore/Slice/highlightSlice";
import OpenHighlightComponent from "../HighlightComponent/OpenHighlightComponent";
import { getUserByIdFuntion } from "../../../utils/api/methods/UserService/post";
import { toast } from "sonner";

const Profile = ({ render,setRender}:any) => {

  const [addHighlight, setAddHighlight] = useState(false);
  const [deleteHighlight, setDeleteHighlight] = useState(false);
  const [openFollowings,setOpenFollowings] = useState(false)
  const [openFollowers,setOpenFollowers] = useState(false)
  const [postComponent, setPostComponent] = useState(false);
  const [currentUser,setCurrentUser] = useState<any>([])
  const [otherUser, setOtherUser] = useState(true);
  const [openHighlight, setOpenHighlight] = useState(-1);
  const [highlightName, setHighlightName] = useState("");
  const [highlightList,setHighlightList] = useState(false)
  const dispatch = useDispatch()
  const userData = useSelector((state: any) => state.persisted.user.userData);
  let { user_id } = useParams();
  
  const highlights = useSelector((state: any) => state.persisted.highlight.highlightData);
  useEffect(()=>{
    (async ()=>{
      if(user_id){
        const response = await getUserByIdFuntion(user_id)
        setCurrentUser(response.data)
      }
    })()
  },[user_id])

  let highlight
  useEffect(()=>{
    (async ()=>{
      if(user_id){
        const response:any = await GetHighlightData(user_id)        
        if(response?.data?.status){
         highlight = response?.data?.data?.highlights
         dispatch(addHighlights(highlight))
        }else{
         dispatch(deleteHighlights())
        }
      }else{
        toast.error("User not found")
      }
    })();
    setDeleteHighlight(false)
  },[addHighlight,highlightList,highlight,deleteHighlight,user_id])
  
useEffect(()=>{
  if(highlights.length==0){
    setOpenHighlight(-1)
  }
},[highlights])

  return (
    <>
    <div className=" flex flex-col w-full ">
      <div className="">
        <div className="lg:pt-10 lg:flex lg:justify-around">
          <div className="flex justify-center lg:justify-start">
            <div className="w-32 lg:w-48 lg:h-48 h-32">
              <img
                className=" w-full h-full rounded-full border border-teal-900"
                src={
                  userData.profile?.startsWith("https://graph.facebook.com/")
                    ? `${currentUser?.profile?.profileUrl}`
                    : currentUser?.profile?.profileUrl
                    ? `http://localhost:3000/profile/${currentUser?.profile?.profileUrl}`
                    : `${profile}`
                }
                alt="Profile"
              />
              <div className="flex flex-row justify-center text-center font-medium cursor-pointer mt-3 lg:mt-6">
                <p className="font-extrabold text-lg text-black">
                  {currentUser?.basicInformation?.fullName}
                </p>
                <p className="ml-3 hidden lg:flex">
                  <Link to="/settings">
                    <Edit />
                  </Link>
                </p>
              </div>
            </div>
          </div>
          {otherUser && (
            <div className="flex justify-around row-start-1 w-30 mr-6 md:ml-20 md:mr-20 mt-16 lg:hidden">
              <button className="border border-[#000] bg-[#C1506D] hover:bg-[#C1506D] px-8 py-1  rounded-3xl">
                Follow
              </button>
              <button className="border border-[#C1506D] px-5 py-1 rounded-3xl">
                Message
              </button>
            </div>
          )}
          <div className="grid grid-cols-4 grid-rows-3 gap-4 mt-5 lg:pt-0">
            <div
              className={`${
                !otherUser ? "mt-8" : "mt-0"
              } flex flex-col w-[90vw] sm:w-[55vw] md:w-[45vw] lg:w-[30vw] col-span-4 row-span-3 row-start-1 ml-4 lg:mt-0`}
            >
              <p className="underline mb-1 text-xl text-black">{currentUser?.basicInformation?.userName}</p>
              {otherUser && (
                <div className="lg:flex w-64 my-3 justify-between hidden ">
                  <button className="border border-[#000] bg-[#d2637f] hover:bg-[#C1506D] px-8 py-1 rounded-3xl">
                    Follow
                  </button>
                  <button className="border border-black px-5 py-1 hover:border-[#C1506D] rounded-3xl">
                    Message
                  </button>
                </div>
              )}

              <p className=" text-sm mt-3 w-full h-20">
               {currentUser?.profile?.bio}
              </p>
            </div>

            <div className="col-span-full col-start-1 row-start-4 flex justify-around border-y border-teal-900 cursor-pointer py-2">
              <div className=" flex flex-col">
                <p className="text-center font-medium">20</p>
                <p className="font-light text-black">Post</p>
              </div>
              <div className=" flex flex-col" onClick={()=>setOpenFollowers(true)}>
                <p className="text-center font-medium">200</p>
                <p className="font-light text-black">followers</p>
              </div>
              <div className=" flex flex-col" onClick={()=>setOpenFollowings(true)}>
                <p className="text-center font-medium">200</p>
                <p className="font-light text-black">following</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative w-72 sm:w-96 md:w-[460px] lg:w-[660px] lg:mt-0">
            <div className="not-prose relative rounded-xl overflow-x-auto scrollbar-hide">
              <div className="mt-3 flex justify-center lg:mt-8">
                <div className="flex justify-start w-72 sm:w-96 sm:gap-3 md:w-[460px] lg:w-[660px] lg:gap-9">
                  {highlights.length!=0 && highlights.map((val:any,index:number) => {                    
                    return (
                      <Highlight
                      setOpenHighlight={setOpenHighlight}
                      index={index}
                      highlight={val}
                      extra={false as boolean}
                      setAddHighlight={setAddHighlight}
                      />
                    );
                  })}
                  {/* {user_id === userData.userId}{ */}
                  <Highlight
                    extra={true as boolean}
                    setAddHighlight={setAddHighlight}
                  />
                  {/* } */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {highlights.length!=0 && openHighlight >=0 && <OpenHighlightComponent openHighlight={openHighlight} setOpenHighlight={setOpenHighlight} setHighlightList={setHighlightList} setHighlightName={setHighlightName} setDeleteHighlight={setDeleteHighlight} />}
        {openFollowers && <FollowComponent openFollowers={openFollowers} openFollowings={openFollowings} setOpenFollowers={setOpenFollowers} setOpenFollowings={setOpenFollowings} />}
        {openFollowings && <FollowComponent openFollowers={openFollowers} openFollowings={openFollowings} setOpenFollowers={setOpenFollowers} setOpenFollowings={setOpenFollowings} />}
        {addHighlight && <AddHighlightComponent highlightName={highlightName} setHighlightName={setHighlightName} setHighlightList={setHighlightList}  setAddHighlight={setAddHighlight}/>}
        {highlightList && <HighlightListComponent highlightName={highlightName} setHighlightList={setHighlightList} setHighlightName={setHighlightName}/>}
        <div className="flex justify-around mt-10 px-10 lg:px-64 font-medium cursor-pointer">
          <p
            onClick={() => setPostComponent(true)}
            className={
              postComponent
                ? "underline font-extrabold text-black"
                : "text-black"
            }
          >
            posts
          </p>
          <p
            onClick={() => setPostComponent(false)}
            className={
              !postComponent
                ? "underline font-extrabold text-black"
                : "text-black"
            }
          >
            saved
          </p>
        </div>
      </div>
        <div className="lg:px-16 overflow-y-auto scrollbar-hide">
          <PostsComponent setRender={setRender} render={render}/>
        </div>
        </div>
    </>
  );
};

export default Profile;
