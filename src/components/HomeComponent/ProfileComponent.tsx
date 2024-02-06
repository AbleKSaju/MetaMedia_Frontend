import { useState } from "react";
import PostsComponent from "../SubHomeComponents/PostsComponent";
import {
  Edit,
  Home,
  LayoutGrid,
  LucideMessageSquareText,
  Plus,
  Search,
  User,
  X,
} from "lucide-react";

const Profile = () => {
  const [postComponent, setPostComponent] = useState(true);
  const [otherUser, setOtherUser] = useState(false);
  const [highlight, setHighlight] = useState(false);
  return (
    <>
      <div className="p-4 lg:pt-10 lg:flex lg:justify-around">
        <div className="flex justify-center lg:justify-start">
          <div className=" w-32 lg:w-40 lg:h-40 h-32">
            <img
              className=" w-full h-full rounded-full border border-teal-800"
              src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg"
              alt="Profile"
            />
            <div className="flex flex-row justify-center text-center font-medium cursor-pointer mt-3 lg:mt-6">
              <p>kendalljenner </p>
              <p className="ml-3">
                <Edit />
              </p>
            </div>
          </div>
        </div>
        {otherUser && (
          <div className="flex justify-around row-start-1 w-30 mr-6 md:ml-20 md:mr-20 mt-16 lg:hidden">
            <button className="border border-teal-800 px-8 py-1 rounded-3xl">
              Follow
            </button>
            <button className="border border-teal-800 px-5 py-1 rounded-3xl">
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
            <p className="underline mb-1">Kendall</p>
            {otherUser && (
              <div className="lg:flex w-64 my-3 justify-between hidden ">
                <button className="border border-teal-800 px-8 py-1 rounded-3xl">
                  Follow
                </button>
                <button className="border border-teal-800 px-5 py-1 rounded-3xl">
                  Message
                </button>
              </div>
            )}

            <p className="font-light text-sm">
              dsjsdkhh jsdjkhdjshk jhdsjkdsd jkfjdsfdbj gdgdfggd hdgsfdsfssd
              sddsaffdssdfdfs sddsfsdddsffdssdfd dsjsdkhh jsdjkhdjshk jhdsjkdsd
              jkfjdsfdbj gdgdfggd hdgsfdsfssd sddsaffdssdfdfs sddsfsdddsffdssdfd
            </p>
          </div>

          <div className="col-span-full col-start-1 row-start-5 flex justify-around border-y border-teal-800 cursor-pointer py-2">
            <div className=" flex flex-col">
              <p className="text-center font-medium">20</p>
              <p className="font-light">Post</p>
            </div>
            <div className=" flex flex-col">
              <p className="text-center font-medium">200</p>
              <p className="font-light">followers</p>
            </div>
            <div className=" flex flex-col">
              <p className="text-center font-medium">200</p>
              <p className="font-light">following</p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:px-20 mt-3 lg:pt-0 md:pt-6">
        <div className=" col-span-full flex justify-around w-full lg:mt-4">
          <div className="">
            <img
              className="rounded-full border-2 border-teal-800 w-16 h-16 lg:w-28 lg:h-28"
              src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg"
              alt="HL"
            />
          </div>
          <div className="">
            <img
              className="rounded-full border-2 border-teal-800 w-16 h-16 lg:w-28 lg:h-28"
              src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg"
              alt="HL"
            />
          </div>
          <div className="">
            <img
              className="rounded-full border-2 border-teal-800 w-16 h-16 lg:w-28 lg:h-28"
              src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg"
              alt="HL"
            />
          </div>
          <div className="">
            <img
              className="rounded-full border-2 border-teal-800 w-16 h-16 lg:w-28 lg:h-28"
              src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg"
              alt="HL"
            />
          </div>
          <div className="">
            <img
              className="rounded-full border-2 border-teal-800 w-16 h-16 lg:w-28 lg:h-28"
              src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg"
              alt="HL"
            />
          </div>
        </div>
      </div>
      {highlight && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="relative w-full max-w-[70vw] sm:max-w-[40vw] h-40 lg:h-52 bg-white border border-teal-900 rounded-lg">
            <div className="flex flex-col p-1">
              <div className="flex justify-end">
                <X size={22} />
              </div>
              <div>
                <p className="text-center font-medium">Add Highlight</p>
              </div>
              <div className="flex justify-center mt-4 lg:mt-8">
                <input
                  placeholder="highlight name"
                  type="text"
                  className="border p-1 border-teal-900 font-light rounded-md md:w-72 outline-none"
                />
              </div>
              <button className="mt-4 lg:mt-8 pt-2 lg:pt-4 w-full border-t border-t-teal-900 font-medium">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-around mt-10 lg:px-20 font-medium cursor-pointer">
        <p
          onClick={() => setPostComponent(true)}
          className={postComponent ? "underline font-extrabold" : ""}
        >
          posts
        </p>
        <p
          onClick={() => setPostComponent(false)}
          className={!postComponent ? "underline font-extrabold" : ""}
        >
          saved
        </p>
      </div>
      <div className="lg:px-16">
        {postComponent && <PostsComponent />}
        {!postComponent && <PostsComponent />}
      </div>

      <div className="fixed bottom-0 border-y border-teal-800 sm:hidden w-full flex justify-around items-center p-4 z-10 bg-white">
        <p className="">
          <Home />
        </p>
        <p className="">
          <Search />
        </p>
        <p className="">
          <LayoutGrid />
        </p>
        <p className="">
          <LucideMessageSquareText />
        </p>
        <p className="">
          <User />
        </p>
      </div>
    </>
  );
};

export default Profile;
