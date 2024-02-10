import { useState } from "react";
import PostsComponent from "../SubHomeComponents/PostsComponent";
import {Edit,X} from "lucide-react";
import Highlight from "./HighlightComponent";
import { addHighlightFunction } from "../../utils/api/methods";
import { SetSidebarOpenFunction } from "src/pages/user/Home";
import { Link } from "react-router-dom";

const Profile: React.FC<SetSidebarOpenFunction> = ({setSidebarOpen}) => {
  console.log("I AM PROFILE");
  
  const [highlightName, setHighlightName] = useState("");
  const [postComponent, setPostComponent] = useState(true);
  const [otherUser, setOtherUser] = useState(false);
  const [addHighlight, setAddHighlight] = useState(false);
  const [highlightData, setHighlightData] = useState(["aads", "asdasas"]);
  setSidebarOpen(true)

  const addImage = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

    const handleFileChange = async (e: any) => {
      let data
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      if(highlightName){
        data = {
          name: highlightName,
          file: formData,
        };
        const response = await addHighlightFunction(data);
        console.log(response,"rrrr");
        
      }else{
        data = {
          file : formData
        }
        const response = await addHighlightFunction(data);
        console.log(response,"resss");
        

      }
 
    // try {
    //   // dispatch(setCredentials({ ...res }));
    //   console.log(response, "responseee");
    // } catch (err) {
    //   console.log(err, "errorrr");
    //   // toast.error(err?.data?.message || err.message);
    // }
  };

  return (
    <>
     <div className="sm:ml-60 sm:p-7 md:p-2 lg:ml-72 ">
      <div className="p-4 lg:pt-10 lg:flex lg:justify-around">
        <div className="flex justify-center lg:justify-start">
          <div className=" w-32 lg:w-40 lg:h-40 h-32">
            <img
              className=" w-full h-full rounded-full border border-teal-900"
              src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg"
              alt="Profile"
            />
            <div className="flex flex-row justify-center text-center font-medium cursor-pointer mt-3 lg:mt-6">
              <p className="font-extrabold text-lg text-teal-900">
                kendalljenner
              </p>
              <p className="ml-3">
                <Link to="/settings/editProfile">
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
              sddsaffdssdfdfs sddsfsdddsffdssdfd dsjsdkhh jsdjkhdjshk jhdsjkdsd
              jkfjdsfdbj gdgdfggd hdgsfdsfssd sddsaffdssdfdfs sddsfsdddsffdssdfd
            </p>
          </div>

          <div className="col-span-full col-start-1 row-start-5 flex justify-around border-y border-teal-900 cursor-pointer py-2">
            <div className=" flex flex-col">
              <p className="text-center font-medium">20</p>
              <p className="font-light text-teal-900">Post</p>
            </div>
            <div className=" flex flex-col">
              <p className="text-center font-medium">200</p>
              <p className="font-light text-teal-900">followers</p>
            </div>
            <div className=" flex flex-col">
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

      {addHighlight && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="relative w-full max-w-[70vw] sm:max-w-[40vw] h-40 lg:h-52 bg-white border border-teal-900 rounded-lg">
            <div className="fle((x flex-col p-1">
              <button
                onClick={() => setAddHighlight(false)}
                className="flex justify-end w-full"
              >
                <X size={22} />
              </button>

              <div>
                <p className="text-center font-medium">Add Highlight</p>
              </div>
              <div className="flex justify-center mt-4 lg:mt-8">
                <input
                  placeholder="highlight name"
                  type="text"
                  onChange={(e) => setHighlightName(e.target.value)}
                  value={highlightName}
                  className="border p-1 border-teal-900 font-light rounded-md md:w-72 outline-none"
                />
              </div>
              <input
                type="file"
                name="file"
                id="fileInput"
                onChange={handleFileChange}
                hidden
              />
              <button
                onClick={addImage}
                disabled={!highlightName.length}
                className={`mt-4 lg:mt-8 pt-2 lg:pt-4 w-full border-t border-t-teal-900 font-medium 
                ${
                  !highlightName.length ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
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
