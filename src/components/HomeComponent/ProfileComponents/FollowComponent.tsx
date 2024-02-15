import { X } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const FollowComponent = ({
  openFollowers,
  openFollowings,
  setOpenFollowers,
  setOpenFollowings,
}: any) => {
  const [searchUser, setSearchUser] = useState("");
  const [followers, setfollowers] = useState([
    "xcvxvc",
    "SDfsffsd",
    "sfdfds",
    "sfdssf",
    "xcvxvc",
    "SDfsffsd",
    "sfdfds",
    "sfdssf",
    "xcvxvc",
    "SDfsffsd",
    "sfdfds",
    "sfdssf",
    "sfdssf",
    "xcvxvc",
    "SDfsffsd",
    "sfdfds",
    "sfdssf",
    "xcvxvc",
    "SDfsffsd",
    "sfdfds",
    "sfdssf",
  ]);
  const [following, setfollowing] = useState([
    "xcvxvc",
    "SDfsffsd",
    "sfdfds",
    "sfdssf",
  ]);
  const userData = useSelector((state: any) => state.persisted.user.userData);

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="relative w-72 sm:w-[450px] h-[400px] sm:h-[500px] bg-white border border-teal-900 rounded-lg">
        <div className="flex h-[370px] sm:h-[500px] flex-col p-1">
          <button
            onClick={() => {
              setOpenFollowers(false);
              setOpenFollowings(false);
            }}
            className="relative bg-red-600 w-full"
          >
            <X size={22} className="absolute right-0" />
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
          <div className=" h-64 sm:h-80 w-auto mx-4 sm:mx-16 sm:pt-5 scrollbar-hide overflow-y-auto ">
            {openFollowers &&
              followers.map((val, index) => (
                <div key={index} className="h-11 mb-2">
                  <div className="flex ">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        userData.profile.startsWith(
                          "https://graph.facebook.com/"
                        )
                          ? `${userData.profile}`
                          : userData.profile
                          ? `http://localhost:3000/profile/${userData.profile}`
                          : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                      }
                      alt=""
                    />
                    <p className="ml-2 flex items-center">{val}</p>
                    <div className=" flex items-center w-full justify-end">
                      <button className="border border-teal-900 hover:bg-teal-900 hover:text-amber-50 rounded-full hidden sm:flex px-3">
                        remove
                      </button>
                      <button className="border border-teal-900 hover:bg-teal-900 rounded-full sm:hidden">
                        <X size={17} />
                      </button>{" "}
                    </div>
                  </div>
                </div>
              ))}
            {openFollowings &&
              following.map((val, index) => (
                <div key={index} className="h-11 mb-2">
                  <div className="flex ">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        userData.profile.startsWith(
                          "https://graph.facebook.com/"
                        )
                          ? `${userData.profile}`
                          : userData.profile
                          ? `http://localhost:3000/profile/${userData.profile}`
                          : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                      }
                      alt=""
                    />
                    <p className="ml-2 flex items-center">{val}</p>
                    <div className=" flex items-center w-full justify-end">
                      <button className="border border-teal-900 hover:bg-teal-900 hover:text-amber-50 rounded-full hidden sm:flex px-3">
                        remove
                      </button>
                      <button className="border border-teal-900 hover:bg-teal-900 rounded-full sm:hidden">
                        <X size={17} />
                      </button>{" "}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <button
            disabled={!searchUser.length}
            className={`mt-4 lg:mt-8 pt-2 absolute bottom-3 lg:pt-4 w-full border-t border-t-teal-900 font-medium 
        ${searchUser.length ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowComponent;
