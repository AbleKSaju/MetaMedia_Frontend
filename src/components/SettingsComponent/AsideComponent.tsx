import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { clearToken } from "../../utils/ReduxStore/Slice/tokenSlice";
import { LogoutFunction } from "../../utils/api/methods";
import { addProfileImageFunction } from "../../utils/api/methods/UserService/post";
import { addProfileImage } from "../../utils/ReduxStore/Slice/userSlice";
import { persistor } from "../../utils/ReduxStore/Store/Store";
import profile from '../../assets/profile.webp'


const Aside = () => {
  const location = useLocation();
  const userData = useSelector((state: any) => state.persisted.user.userData);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    const response: any = await LogoutFunction();
    if (response?.data?.status) {
      dispatch(clearToken());
      toast.success(response?.data?.message);
      Navigate("/login");
    } else {
      toast.error("Logout error");
    }
    persistor.purge();
  };

  const addImage = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  const handleFileChange = async (e: any) => {
    try {
      const file = e.target.files[0];
  
      // Check if a file is selected
      if (!file) {
        toast.error("Please select a file.");
        return;
      }
  
      // Check if the selected file is an image
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file.");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData, "FORMDATA");
  
      const response = await addProfileImageFunction(formData);
      if (response?.status) {
        const data = {
          profile: response?.data?.profile?.profileUrl,
        };
        dispatch(addProfileImage(data));
        toast.success(response?.message);
        Navigate("/profile");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  
  return (
    <div className="sm:w-96 lg:w-[400px]">
      <div className="sm:ml-0 sm:flex">
        <div className="flex overflow-hidden ">
          <div className="sm:w-96 lg:w-[400px]">
            <div className="sm:ml-20 flex justify-center border-r border-teal-900 h-[99vh]">
              <div className="w-[100vw] sm:w-64 lg:w-[400px] sm:mt-3 ">
                <div className="flex flex-col justify-center">
                  <img
                    onClick={addImage}
                    className="w-32 h-32 sm:w-24 sm:h-24 md:w-32 self-center md:h-32 border border-teal-900 rounded-full mt-5"
                    src={
                      userData.profile?.startsWith("https://graph.facebook.com/")
                        ? `${userData.profile}`
                        : userData.profile
                          ? `http://localhost:3000/profile/${userData?.profile}`
                          : `${profile}`
                    }
                    alt="Profile Picture"
                  />

                  <input
                    type="file"
                    name="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    hidden
                  />
                <p className="text-center font-bold text-lg mt-8">{userData?.name}</p>
                <p className="text-center mt-3 ">
                  {userData?.userName} <br />
                  <p className="text-center">
                    {userData?.bio}
                  </p>
                </p>
                </div>
                {/* <div className=" flex flex-col w-52 ml-10 content-center bg-red-500 "> */}

                {/* </div> */}
              </div>
              <div className="w-[100vw] sm:w-64 lg:w-[320px] absolute bottom-16 sm:bottom-3 cursor-pointer">
                <div className="grid grid-cols-12 grid-rows-12 text-center text-teal-900 bg-amber-50 mx-5 sm:mx-0  font-medium text-lg">
                  <Link
                    to="/settings"
                    className={`${
                      location.pathname === "/settings"
                        ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900"
                        : "border-white border-b-4"
                    } col-span-12 row-span-2 col-start-1 row-start-1 w-full py-2 md:py-2.5 sm:px-2 mt-1 `}
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="/settings/activity"
                    className={`${
                      location.pathname == "/settings/activity"
                        ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900"
                        : "border-white border-b-4"
                    } col-span-12 row-span-2 col-start-1 row-start-3 w-full  py-2 md:py-2.5 sm:px-2 mt-1`}
                  >
                    Activity
                  </Link>
                  <Link
                    to="/settings/security"
                    className={`${
                      location.pathname == "/settings/security"
                        ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900"
                        : "border-white border-b-4"
                    } col-span-12 row-span-2 col-start-1 row-start-5 w-full py-2 md:py-2.5 sm:px-2 mt-1 `}
                  >
                    Security
                  </Link>
                  <Link
                    to="/settings/notification"
                    className={`${
                      location.pathname === "/settings/notification"
                        ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900"
                        : "border-white border-b-4"
                    } col-span-12 row-span-2 col-start-1 row-start-7 w-full py-2 md:py-2.5 sm:px-2 mt-1 `}
                  >
                    Notification
                  </Link>
                  <Link
                    to="/settings/contactUs"
                    className={`${
                      location.pathname == "/settings/contactUs"
                        ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900"
                        : "border-white border-b-4"
                    } col-span-12 row-span-2 col-start-1 row-start-9 w-full py-2 md:py-2.5 sm:px-2 mt-1 `}
                  >
                    Contact us
                  </Link>
                  {/* <div  className={`${location.pathname === 5 ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900":"border-white border-b-4" } col-span-12 row-span-2 col-start-1 row-start-11 w-full py-2 md:py-2.5 sm:px-2 mt-1`}> */}
                  <div
                    onClick={handleLogout}
                    className={`${"border-white border-b-4"} col-span-12 row-span-2 col-start-1 row-start-11 w-full py-2 md:py-2.5 sm:px-2 mt-1`}
                  >
                    Logout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aside;
