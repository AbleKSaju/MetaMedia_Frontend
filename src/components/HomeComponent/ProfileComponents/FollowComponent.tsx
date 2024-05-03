import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { editUser } from "../../../utils/ReduxStore/Slice/userSlice";
import { followUserFunction, getUserByIdFuntion } from "../../../utils/api/methods/UserService/post";
import profile from '../../../assets/profile.webp'
import { Link, useNavigate } from "react-router-dom";

const FollowComponent = ({
  users,
  openFollowers,
  openFollowings,
  setOpenFollowers,
  setOpenFollowings,
}: any) => {
  const [searchUser, setSearchUser] = useState("");
  const [followers, setfollowers] = useState<any>([]);
  const [following, setfollowing] = useState([]);
  const [followUser,setFollowUser] = useState(false)

  const wrapperRef: any = useRef(null);
  const Navigate=useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((state: any) => state.persisted.user.userData);

  const RemoveFollowingUser = async(id:string)=>{
    const data = {
      currentUserId: userData.userId,
      followedUserId: id,
    };
    const response: any = await followUserFunction(data);
    toast.success(response.data.message);

    if (response.data.status) {
      try {
        const response = await getUserByIdFuntion(userData.userId);
        console.log(response,"respon");
        
        if (response?.status) {
          dispatch(editUser(response.data.socialConections));
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  useEffect(()=>{    
    (async()=>{
    if(searchUser.length && searchUser.trim()!==""){
        const searchedUsers = users.filter((item:any) => item.fullName.toLowerCase().startsWith(searchUser));
        setfollowing(searchedUsers)
        setfollowers(searchedUsers)
    }else{      
      setfollowing(users)
      setfollowers(users)
    }
  })()
  },[searchUser,RemoveFollowingUser,followUser])


  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpenFollowers(false);
      setOpenFollowings(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const FollowUser = async (id: string) => {
    const data = {
      currentUserId: userData.userId,
      followedUserId: id,
    };
    const response: any = await followUserFunction(data);    
    if (response.data.status) {
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
        setFollowUser(!followUser)
    }else{
      toast.error(response.data.message);
    }
  };
  const NavigateToUserProfile=(userId:string)=>{
    Navigate(`/profile/${userId}`)
    setOpenFollowers(false);
    setOpenFollowings(false);
  }
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur bg-opacity-50 bg-black" ref={wrapperRef}>
      <div className="relative w-72 sm:w-[450px] h-[400px] sm:h-[500px] bg-white border border-[#C1506D] rounded-lg">
        <div className="flex h-[370px] sm:h-[500px] flex-col p-1">
          <button
            onClick={() => {
              setOpenFollowers(false);
              setOpenFollowings(false);
            }}
            className="relative w-full"
          >
            <X size={22} className="absolute right-2 top-2" />
          </button>

          <div>
            <p className="text-center font-medium mt-3">
              {(openFollowings && <p>following</p>) ||
                (openFollowers && <p>followers</p>)}
            </p>
          </div>
          <div className="flex justify-center mt-2 mb-3 lg:mt-6">
            <input
              placeholder="Search.."
              type="text"
              onChange={(e) => setSearchUser(e.target.value)}
              value={searchUser}
              className="border p-1 border-[#C1506D] font-light rounded-md w-60 md:w-72 outline-none"
            />
          </div>
          <div className=" h-64 sm:h-96 w-auto mx-4 sm:mx-16 sm:pt-5 scrollbar-hide overflow-y-auto ">
            {openFollowers &&
              followers.map((val:any, index:number) => {                
                
                return (
                <div key={index} className="h-11 mb-2">
                  <div className="flex ">
                    <img
                    onClick={()=>NavigateToUserProfile(val.userId)}
                      className="w-10 h-10 border border-black rounded-full"
                      src={
                        val.profile?.startsWith(
                          "https://graph.facebook.com/"
                        )
                          ? `${val.profile}`
                          : val.profile
                          ? `http://localhost:3000/profile/${val.profile}`
                          : profile
                      }
                      alt=""
                    />
                  <p className="ml-2 w-96 flex items-center">{val.fullName}</p>
                    <div className=" flex items-center w-full justify-end">
                      {userData.userId !== val.userId &&   
                      <button onClick={()=>FollowUser(val?.userId)}
                      className="w-16 h-6 border border-[#C1506D] rounded-lg sm:flex justify-center items-center font-semibold text-[12px] text-[#C1506D] " >
                      {userData.following.some((follow:any) => follow.userId === val.userId) ? "unfollow" : (userData.userId === val.userId ? "" : "follow")}
                      </button>
                      }
                      {/* <button className="border border-black hover:bg-black rounded-full sm:hidden">
                          <X size={17} />
                      </button> */}
                    </div>
                  </div>
                </div>
              )})}
            {openFollowings &&
              following.map((val:any, index:number) => {
              return (
                <div key={index} className="h-11 mb-2">
                  <div className="flex ">
                    <img
                    onClick={()=>NavigateToUserProfile(val.userId)}
                      className="w-10 h-10 border border-black rounded-full object-cover"
                      src={
                        val.profile?.startsWith(
                          "https://graph.facebook.com/"
                        )
                          ? `${val.profile}`
                          : val.profile
                          ? `http://localhost:3000/profile/${val.profile}`
                          : profile
                      }
                      alt=""
                    />
                    <p className="ml-2 w-32 sm:w-full flex items-center">{val.fullName}</p>
                    <div className=" flex items-center justify-end">
                    {userData.userId !== val.userId &&   
                      <button onClick={()=>RemoveFollowingUser(val.userId)}
                       className="w-16 h-6 border border-[#C1506D] rounded-lg sm:flex justify-center items-center font-semibold text-[12px] text-[#C1506D] " >
                        <p className="text-center w-full"> {userData.following.some((follow:any) => follow.userId === val.userId) ? "unfollow" : (userData.userId === val.userId ? "" : "follow")}</p>
                      </button>
              }
                      {/* <button className="border border-black hover:bg-black rounded-full sm:hidden">
                        <X size={17} />
                      </button> */}
                    </div>
                  </div>
                </div>
              )})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowComponent;
