import axios from "axios";
import { Search, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GetSearchUserDataFunction } from "../../../utils/api/methods/UserService/get";
import SearchUserShimmer from "../../../pages/shimmer/SearchUserShimmer";
import { Link } from "react-router-dom";
import { followUserFunction, getUserByIdFuntion } from "../../../utils/api/methods/UserService/post";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../../utils/ReduxStore/Slice/userSlice";
import { toast } from "sonner";

const SearchComponent = ({ setOpenSearch }: any) => {
  const [searchUser, setSearchUser] = useState("");
  const [userLoading, setUserLoading] = useState<any>("");
  const [searchedUsers, setsearchedUsers] = useState<any>([]);
  const [noUserFound, setNoUserFound] = useState(false);
  const [followUser,setFollowUser] = useState(false)
  const wrapperRef: any = useRef(null);

  const dispatch = useDispatch()

  const userData = useSelector((state:any)=>state.persisted.user.userData)

  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpenSearch(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchUser.length && searchUser.trim() !== "") {
      setsearchedUsers([]);
      setUserLoading(true);
      const getData = setTimeout(async () => {
        console.log("MAKING REQUEST with", searchUser);
        const response = await GetSearchUserDataFunction(searchUser);
        console.log(response,"responseresponse");
        
        if (response.status) {
          setsearchedUsers(response?.data);
        } else {
          setNoUserFound(true);
        }
        setUserLoading(false);
      }, 1000);
      return () => clearTimeout(getData);
    }
  }, [searchUser,followUser]);

  const FollowUser = async (id: string) => {
    const data = {
      currentUserId: userData.userId,
      followedUserId: id,
    };
    const response: any = await followUserFunction(data);    
    if (response.data.status) {
      toast.success(response.data.message);
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

  return (
    <>
      <div
        ref={wrapperRef}
        className="hidden sm:block sm:w-5/12 md:w-5/12 lg:w-3/12 h-full bg-white rounded-md  ml-32 fixed z-20 border m-2 overflow-y-auto scrollbar-hide"
      >
        <div className="flex flex-col justify-center  ">
          <div className="w-full h-16  flex justify-center items-center  ">
            <div className="relative flex w-full justify-center">
              <input
                type="text"
                value={searchUser}
                placeholder="Search user ..."
                onChange={(e) => {
                  setSearchUser(e.target.value);
                }}
                className="w-11/12 h-10 rounded-md pl-10 border z-10 outline-none"
              />
              <div className="absolute inset-y-0 left-0 flex justify-between items-center pl-6 w-full gap-60">
                <div className="z-20">
                  <Search size={18} className="text-gray-500 " />
                </div>
                <div className="w-full pl-4 z-20">
                  <XCircle
                    size={16}
                    onClick={() => setSearchUser("")}
                    className="text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr className="w-96" />
          <div className="h-full w-full flex flex-col p-2 gap-2">
            {/* one user serched value --- */}
            {searchedUsers.length != 0 &&
              searchedUsers.map((data: any) => {
                return (
                  <div className="w-full h-20  flex rounded-md border">
                    <div className="h-full w-3/12  flex justify-center items-center">
                      <img
                           src={
                            data.profile?.startsWith("https://graph.facebook.com/")
                              ? `${data.profile}`
                              : data.profile
                                ? `http://localhost:3000/profile/${data.profile}`
                                : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                          }
                        className="w-14 h-14 rounded-full object-fill  border-2  border-[#C1506D]"
                        alt=""
                      />
                    </div>
                    <Link to={`/profile/${data.id}`} className="h-full w-6/12 flex justify-center flex-col  "
                      onClick={()=>setOpenSearch(false)}>
                      <p className="font-semibold text-gray-500 text-md">
                        {data?.userName}
                      </p>
                      <p className="text-gray-400 text-sm pl-1">
                        {data?.fullName}
                      </p>
                    </Link>
                    <div className="w-3/12 flex justify-center items-center">
                      <button className="w-16 h-6 border border-[#C1506D] rounded-full flex justify-center items-center font-semibold text-[11px] text-[#C1506D] "
                      onClick={()=>FollowUser(data?.id)}>
                        {data?.follow?"Following":"Follow"}
                      </button>
                    </div>
                  </div>
                );
              })}
            {userLoading && searchUser.trim() !== "" && <SearchUserShimmer/>}
            {searchUser.trim() !== "" && noUserFound && (
              <p className="text-center mt-20">No results found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
