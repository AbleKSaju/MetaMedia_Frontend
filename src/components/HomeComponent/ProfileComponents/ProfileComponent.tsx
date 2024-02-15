import { useState } from "react";
import PostsComponent from "../../SubHomeComponents/PostsComponent";
import { Edit, X } from "lucide-react";
import Highlight from "../HighlightComponent";
import { addHighlightFunction } from "../../../utils/api/methods";
import { SetSidebarOpenFunction } from "src/pages/user/Home";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddHighlightcmponent from "./AddHighlightcmponent";
import FollowComponent from "./FollowComponent";

const Profile: React.FC<SetSidebarOpenFunction> = ({ setSidebarOpen }) => {
  console.log("I AM PROFILE");

  const [addHighlight, setAddHighlight] = useState(false);
  const [openFollowings,setOpenFollowings] = useState(false)
  const [openFollowers,setOpenFollowers] = useState(false)
  const [postComponent, setPostComponent] = useState(false);
  const [otherUser, setOtherUser] = useState(false);
  const [highlightData, setHighlightData] = useState(["aads", "asdasas"]);
  const userData = useSelector((state: any) => state.persisted.user.userData);
  setSidebarOpen(true);

  return (
    <>
      <div className={`${ !openFollowings || !openFollowers ? "fixed ml-72" : ""} sm:ml-60 sm:p-7 md:p-2 lg:ml-72`}>
        <div className="p-4 lg:pt-10 lg:flex lg:justify-around">
          <div className="flex justify-center lg:justify-start">
            <div className=" w-32 lg:w-40 lg:h-40 h-32">
              <img
                className=" w-full h-full rounded-full border border-teal-900"
                src={
                  userData.profile.startsWith("https://graph.facebook.com/")
                    ? `${userData.profile}`
                    : userData.profile
                    ? `http://localhost:3000/profile/${userData.profile}`
                    : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                }
                alt="Profile"
              />
              <div className="flex flex-row justify-center text-center font-medium cursor-pointer mt-3 lg:mt-6">
                <p className="font-extrabold text-lg text-teal-900">
                  kendalljenner
                </p>
                <p className="ml-3">
                  <Link to="/settings">
                    <Edit />
                  </Link>
                </p>
              </div>
            </div>
          </div>
          {otherUser && (
            <div className="flex justify-around row-start-1 w-30 mr-6 md:ml-20 md:mr-20 mt-16 lg:hidden">
              <button className="border border-teal-900 px-8 py-1 hover:bg-teal-900 hover:text-amber-50 rounded-3xl">
                Follow
              </button>
              <button className="border border-teal-900 px-5 py-1 hover:bg-teal-900 hover:text-amber-50 rounded-3xl">
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
              <p className="underline mb-1 text-xl text-teal-900">Kendall</p>
              {otherUser && (
                <div className="lg:flex w-64 my-3 justify-between hidden ">
                  <button className="border border-teal-900 px-8 py-1 hover:bg-teal-900 hover:text-amber-50 rounded-3xl">
                    Follow
                  </button>
                  <button className="border border-teal-900 px-5 py-1 hover:bg-teal-900 hover:text-amber-50 rounded-3xl">
                    Message
                  </button>
                </div>
              )}

              <p className="font-light text-sm">
                dsjsdkhh jsdjkhdjshk jhdsjkdsd jkfjdsfdbj gdgdfggd hdgsfdsfssd
                sddsaffdssdfdfs sddsfsdddsffdssdfd dsjsdkhh jsdjkhdjshk
                jhdsjkdsd jkfjdsfdbj gdgdfggd hdgsfdsfssd sddsaffdssdfdfs
                sddsfsdddsffdssdfd
              </p>
            </div>

            <div className="col-span-full col-start-1 row-start-5 flex justify-around border-y border-teal-900 cursor-pointer py-2">
              <div className=" flex flex-col">
                <p className="text-center font-medium">20</p>
                <p className="font-light text-teal-900">Post</p>
              </div>
              <div className=" flex flex-col" onClick={()=>setOpenFollowers(true)}>
                <p className="text-center font-medium">200</p>
                <p className="font-light text-teal-900">followers</p>
              </div>
              <div className=" flex flex-col" onClick={()=>setOpenFollowings(true)}>
                <p className="text-center font-medium">200</p>
                <p className="font-light text-teal-900">following</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative w-72 sm:w-96 md:w-[460px] lg:w-[660px] lg:mt-0">
            <div className="not-prose relative rounded-xl overflow-x-auto scrollbar-hide">
              <div className="mt-3 flex justify-center lg:mt-8">
                <div className="flex justify-start w-72 sm:w-96 sm:gap-3 md:w-[460px] lg:w-[660px] lg:gap-9">
                  {highlightData.map((val) => {
                    return (
                      <Highlight
                        extra={false as boolean}
                        setAddHighlight={setAddHighlight}
                      />
                    );
                  })}
                  <Highlight
                    extra={true as boolean}
                    setAddHighlight={setAddHighlight}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {openFollowers && <FollowComponent openFollowers={openFollowers} openFollowings={openFollowings} setOpenFollowers={setOpenFollowers} setOpenFollowings={setOpenFollowings} />}
        {openFollowings && <FollowComponent openFollowers={openFollowers} openFollowings={openFollowings} setOpenFollowers={setOpenFollowers} setOpenFollowings={setOpenFollowings} />}

        {addHighlight && <AddHighlightcmponent setAddHighlight={setAddHighlight}/>}
        <div className="flex justify-around mt-10 px-10 lg:px-64 font-medium cursor-pointer">
          <p
            onClick={() => setPostComponent(true)}
            className={
              postComponent
                ? "underline font-extrabold text-teal-900"
                : "text-teal-900"
            }
          >
            posts
          </p>
          <p
            onClick={() => setPostComponent(false)}
            className={
              !postComponent
                ? "underline font-extrabold text-teal-900"
                : "text-teal-900"
            }
          >
            saved
          </p>
        </div>
        <div className="lg:px-16">
          {postComponent && <PostsComponent />}
          {!postComponent && <PostsComponent />}
        </div>
      </div>
    </>
  );
};

export default Profile;
