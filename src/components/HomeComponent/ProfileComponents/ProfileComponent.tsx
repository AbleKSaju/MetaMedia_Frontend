import { useEffect, useMemo, useState } from "react";
import PostsComponent from "../PostComponent/PostsComponent";
import { Edit } from "lucide-react";
import Highlight from "../HighlightComponent/HighlightComponent";
import { GetHighlightData } from "../../../utils/api/methods";
import profile from "../../../assets/profile.webp";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FollowComponent from "./FollowComponent";
import AddHighlightComponent from "./AddHighlightComponent";
import HighlightListComponent from "../HighlightComponent/HighlightListComponent";
import {
  addHighlights,
  deleteHighlights,
} from "../../../utils/ReduxStore/Slice/highlightSlice";
import OpenHighlightComponent from "../HighlightComponent/OpenHighlightComponent";
import {
  followUserFunction,
  getUserByIdFuntion,
} from "../../../utils/api/methods/UserService/post";
import { toast } from "sonner";
import { CheckUser } from "../../../utils/Helper/CheckUserFollows";
import { editUser } from "../../../utils/ReduxStore/Slice/userSlice";
import StoryProfileShimmer from "../../../pages/shimmer/StoryProfileShimmer";



const Profile = ({ render, setRender }: any) => {
  const [addHighlight, setAddHighlight] = useState(false);
  const [deleteHighlight, setDeleteHighlight] = useState(false);
  const [openFollowings, setOpenFollowings] = useState(false);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<any>([]);
  const [isFollows, setIsFollows] = useState(false);
  const [otherUser, setOtherUser] = useState(false);
  const [openHighlight, setOpenHighlight] = useState(-1);
  const [highlightName, setHighlightName] = useState("");
  const [highlightList, setHighlightList] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.persisted.user.userData);
  let { user_id } = useParams();
  let { pathname } = useLocation();
  const Navigate = useNavigate()
  const highlights = useSelector((state: any) => state.persisted.highlight.highlightData);

  const currentPath:any=pathname.split('/')
  const path = currentPath.splice(currentPath.length-2,1).toString()
  

const checkUser = useMemo(
    () => async () => {
      if (userData.userId !== user_id) {
        await CheckUser(userData, user_id, setIsFollows);
      }
    },
    [userData, user_id, setIsFollows]
  );

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const FollowUser = async (id: string) => {
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
  };

  useEffect(() => {
    (async () => {
      if (user_id) {
        if (user_id !== userData.userId) {
          setOtherUser(true);
        } else {
          setOtherUser(false);
        }
        const response = await getUserByIdFuntion(user_id);
        setCurrentUser(response.data);
      }
    })();
  }, [user_id, userData]);


  let highlight;
  useEffect(() => {
    (async () => {
      setLoading(true);
      if (user_id) {
        const response: any = await GetHighlightData(user_id);
        if (response?.data?.status) {
          setLoading(false);
          highlight = response?.data?.data?.highlights;
          dispatch(addHighlights(highlight));
        } else {
          dispatch(addHighlights([]));
          dispatch(deleteHighlights());
        }
      } else {
        toast.error("User not found");
      }
    })();
    setDeleteHighlight(false);
  }, [addHighlight, highlightList, highlight, deleteHighlight,user_id]);

  useEffect(() => {
    if (highlights.length == 0) {
      setOpenHighlight(-1);
    }
  }, [highlights]);


  const postLength = (data: any) => {
    setPostCount(data);
  };
  const Message=(id:string)=>{    
    Navigate(`/message/${id}`)
  }

  return (
    <>
      <div className=" flex flex-col w-full overflow-auto scrollbar-hide">
        <div className="">
          <div className="lg:pt-10 lg:flex lg:justify-around">
            <div className="flex justify-center lg:justify-start">
              <div className="w-32 lg:w-48 lg:h-48 h-32">
                <img
                  className=" w-full h-full rounded-full border border-black"
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
                    {!otherUser && (
                      <Link to="/settings">
                        <Edit />
                      </Link>
                    )}
                  </p>
                </div>
              </div>
            </div>
            {otherUser && (
              <div className="flex justify-around row-start-1 w-30 mr-6 md:ml-20 md:mr-20 mt-16 lg:hidden">
                <button
                  className="bg-[#C1506D] hover:bg-[#C1506D] px-8 py-1 text-white rounded-3xl"
                  onClick={() =>
                    FollowUser(currentUser?.basicInformation?.userId)
                  }
                >
                  {isFollows ? "Following" : "Follow"}
                </button>
                <button className="border border-[#C1506D] px-5 py-1 rounded-3xl">
                  <Link to={`/message/${currentUser?.basicInformation?.userId}`}>
                  Message
                </Link>
                </button>
              </div>
            )}
            <div className="grid grid-cols-4 grid-rows-3 gap-4 mt-5 lg:pt-0">
              <div
                className={`${
                  !otherUser ? "mt-8" : "mt-0"
                } flex flex-col w-[90vw] sm:w-[55vw] md:w-[45vw] lg:w-[30vw] col-span-4 row-span-3 row-start-1 ml-4 lg:mt-0`}
              >
                <p className="underline mb-1 text-xl text-black">
                  {currentUser?.basicInformation?.userName}
                </p>
                {otherUser && (
                  <div className="lg:flex w-64 my-3 justify-between hidden ">
                    <button
                      className=" bg-[#C1506D] text-white w-28 py-1 rounded-3xl"
                      onClick={() =>
                        FollowUser(currentUser?.basicInformation?.userId)
                      }
                    >
                          {isFollows ? "Following" : "Follow"}
                    </button>
                    <button onClick={()=>Message(currentUser?.basicInformation?.userId)} className="border border-black w-28 py-1 hover:border-[#C1506D] rounded-3xl">
                      Message
                    </button>
                  </div>
                )}
                <p className=" text-sm mt-3 w-full h-20">
                  {currentUser?.profile?.bio}
                </p>
              </div>
              <div className="col-span-full col-start-1 row-start-4 flex justify-around border-y border-black cursor-pointer py-2">
                <div className=" flex flex-col">
                  <p className="text-center font-medium">{postCount}</p>
                  <p className="font-light text-black">Post</p>
                </div>
                <div
                  className=" flex flex-col"
                  onClick={() => setOpenFollowers(true)}
                >
                  <p className="text-center font-medium">{currentUser?.socialConections?.followers.length ?? 0}</p>
                  <p className="font-light text-black">followers</p>
                </div>
                <div
                  className=" flex flex-col"
                  onClick={() => setOpenFollowings(true)}
                >
                  <p className="text-center font-medium">{currentUser?.socialConections?.following.length ?? 0}</p>
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
                    {loading && highlights.length != 0 ? (
                      <StoryProfileShimmer />
                    ) : highlights.length != 0 ? (
                      highlights.map((val: any, index: number) => {
                        return (
                          <Highlight
                            setOpenHighlight={setOpenHighlight}
                            index={index}
                            highlight={val}
                            extra={false as boolean}
                            setAddHighlight={setAddHighlight}
                          />
                        );
                      })
                    ) : (
                      ""
                    )}
                    {!otherUser && (
                      <Highlight
                        extra={true as boolean}
                        setAddHighlight={setAddHighlight}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {highlights.length != 0 && openHighlight >= 0 && (
            <OpenHighlightComponent
              openHighlight={openHighlight}
              setOpenHighlight={setOpenHighlight}
              setHighlightList={setHighlightList}
              setHighlightName={setHighlightName}
              setDeleteHighlight={setDeleteHighlight}
            />
          )}
          {openFollowers && (
            <FollowComponent
              users={currentUser?.socialConections.followers}
              openFollowers={openFollowers}
              openFollowings={openFollowings}
              setOpenFollowers={setOpenFollowers}
              setOpenFollowings={setOpenFollowings}
            />
          )}
          {openFollowings && (
            <FollowComponent
              users={currentUser?.socialConections.following}
              openFollowers={openFollowers}
              openFollowings={openFollowings}
              setOpenFollowers={setOpenFollowers}
              setOpenFollowings={setOpenFollowings}
            />
          )}
          {addHighlight && (
            <AddHighlightComponent
              highlightName={highlightName}
              setHighlightName={setHighlightName}
              setHighlightList={setHighlightList}
              setAddHighlight={setAddHighlight}
            />
          )}
          {highlightList && (
            <HighlightListComponent
              highlightName={highlightName}
              setHighlightList={setHighlightList}
              setHighlightName={setHighlightName}
            />
          )}
          <div className="flex justify-around mt-10 px-10 lg:px-64 font-medium cursor-pointer">
          <Link to={`/profile/${user_id}`}
              className={
                path != "tagged"
                  ? "underline font-extrabold text-black"
                  : "text-black"
              }
            >
              posts
            </Link>
            <Link to={`/profile/tagged/${user_id}`}
              className={
                path == "tagged"
                  ? "underline font-extrabold text-black"
                  : "text-black"
              }
            >
              tagged
            </Link>
          </div>
        </div>
        <div className="lg:px-16">
          <PostsComponent
            postLength={postLength}
            setRender={setRender}
            render={render}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
