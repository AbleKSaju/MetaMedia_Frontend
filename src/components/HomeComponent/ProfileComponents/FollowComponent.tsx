import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { editUser } from "../../../utils/ReduxStore/Slice/userSlice";
import { followUserFunction, getUserByIdFuntion } from "../../../utils/api/methods/UserService/post";

const FollowComponent = ({
  users,
  openFollowers,
  openFollowings,
  setOpenFollowers,
  setOpenFollowings,
}: any) => {
  console.log("I am FollowComponent");
  console.log(users,"usersusersusers");
  
  
  const [searchUser, setSearchUser] = useState("");
  const [followers, setfollowers] = useState([]);
  const [following, setfollowing] = useState([]);
  
  const wrapperRef: any = useRef(null);
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
    console.log("I AM USE EFFECT");
    
    (async()=>{
    if(searchUser.length && searchUser.trim()!==""){
        const searchedUsers = users.filter((item:any) => item.fullName.toLowerCase().startsWith(searchUser));
        setfollowing(searchedUsers)
        setfollowers(searchedUsers)
    }else{
      console.log("SETTING TO FOLLL");
      
      setfollowing(users)
      setfollowers(users)
    }
  })()
  },[searchUser,RemoveFollowingUser])
  console.log(followers,"followersfollowersfollowers");
  
  



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

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-900 bg-opacity-50" ref={wrapperRef}>
      <div className="relative w-72 sm:w-[450px] h-[400px] sm:h-[500px] bg-white border border-teal-900 rounded-lg">
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
              className="border p-1 border-teal-900 font-light rounded-md w-60 md:w-72 outline-none"
            />
          </div>
          <div className=" h-64 sm:h-96 w-auto mx-4 sm:mx-16 sm:pt-5 scrollbar-hide overflow-y-auto ">
            {openFollowers &&
              followers.map((val:any, index) => {
                console.log(val,"I AM VALLLL");
                
                return (
                <div key={index} className="h-11 mb-2">
                  <div className="flex ">
                    <img
                      className="w-10 h-10 border border-black rounded-full"
                      src={
                        val.profile?.startsWith(
                          "https://graph.facebook.com/"
                        )
                          ? `${val.profile}`
                          : val.profile
                          ? `http://localhost:3000/profile/${val.profile}`
                          : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                      }
                      alt=""
                    />
                  <p className="ml-2 w-96 flex items-center">{val.fullName}</p>
                    <div className=" flex items-center w-full justify-end">
                      <button className="border border-black hover:bg-red-600 hover:text-amber-50 rounded-full hidden sm:flex px-3" >
                        remove
                      </button>
                      <button className="border border-black hover:bg-black rounded-full sm:hidden">
                          <X size={17} />
                      </button>
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
                      className="w-10 h-10 border border-black rounded-full"
                      src={
                        val.profile?.startsWith(
                          "https://graph.facebook.com/"
                        )
                          ? `${val.profile}`
                          : val.profile
                          ? `http://localhost:3000/profile/${val.profile}`
                          : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                      }
                      alt=""
                    />
                    <p className="ml-2 w-96 flex items-center">{val.fullName}</p>
                    <div className=" flex items-center justify-end">
                      <button onClick={()=>RemoveFollowingUser(val.userId)}
                       className="border border-black hover:bg-red-600 hover:text-amber-50 rounded-full hidden sm:flex px-3" >
                        remove
                      </button>
                      <button className="border border-black hover:bg-black rounded-full sm:hidden">
                        <X size={17} />
                      </button>
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
