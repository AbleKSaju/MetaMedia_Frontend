import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../assets/profile.webp";
import { BlockAndUnblockUserFunction } from "../../utils/api/methods/ChatService/post/post";
import { editUser } from "../../utils/ReduxStore/Slice/userSlice";
import { toast } from "sonner";

const BlockedUsers = ({ setBlockedUsers }: any) => {
  const [searchUser, setSearchUser] = useState("");
  const [statusChange, setStatusChange] = useState(false);
  const [blockedSearchUsers,setBlockedSearchUsers] = useState([]) 
  const wrapperRef: any = useRef(null);
  const dispatch = useDispatch()
  const userData = useSelector((state: any) => state.persisted.user.userData);

  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setBlockedUsers(false);
    }
  };
  useEffect(() => {
    setBlockedSearchUsers(userData.blockedUsers)
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log(searchUser,"searchUser");

  useEffect(()=>{
      (async()=>{
        console.log("NTTT");
        const users = await userData.blockedUsers.filter((user:any)=>user.fullName.startsWith(searchUser))
        setBlockedSearchUsers(users)
    })()
  },[searchUser,statusChange])

  const BlockAndUnblockUser = async (userId: string) => {
    const data = { userId};
    const response: any = await BlockAndUnblockUserFunction(data);
    if (response.data.status) {
      dispatch(editUser(response.data.data));
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    setStatusChange(!statusChange)
  };

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur bg-opacity-50 bg-black"
      ref={wrapperRef}
    >
      <div className="relative w-72 sm:w-[450px] h-[400px] sm:h-[500px] bg-white border border-teal-900 rounded-lg">
        <div className="flex h-[370px] sm:h-[500px] flex-col p-1">
          <button
            onClick={() => {
              setBlockedUsers(false);
            }}
            className="relative w-full"
          >
            <X size={22} className="absolute right-2 top-2" />
          </button>

          <div>
            <p className="text-center font-bold mt-3">Blocked Users</p>
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
            {blockedSearchUsers.length ?
              blockedSearchUsers.map((val: any, index: number) => {

                return (
                  <div key={index} className="h-11 mb-2">
                    <div className="flex ">
                      <img
                        className="w-10 h-10 border border-black rounded-full"
                        src={
                          val.profile?.startsWith("https://graph.facebook.com/")
                            ? `${val.profile}`
                            : val.profile
                            ? `http://localhost:3000/profile/${val.profile}`
                            : profile
                        }
                        alt=""
                      />
                      <p className="ml-2 w-96 flex items-center">
                        {val.fullName}
                      </p>
                      <div className=" flex items-center w-full justify-end">
                        <button
                          onClick={() =>
                            BlockAndUnblockUser(val?.userId)
                          }
                          className="w-16 h-6 border border-[#C1506D] rounded-lg sm:flex justify-center items-center font-semibold text-[12px] text-[#C1506D] hidden "
                        >
                          Unblock
                        </button>
                        <button className="border border-black hover:bg-black rounded-full sm:hidden">
                          <X size={17} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }): (<p className="text-center text-red-500 font-bold">No Blocked Users</p> )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockedUsers;
