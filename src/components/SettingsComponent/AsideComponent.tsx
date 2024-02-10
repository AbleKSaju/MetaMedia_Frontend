import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { clearToken } from "../../utils/ReduxStore/Slice/tokenSlice";
import { LogoutFunction } from "../../utils/api/methods";

const Aside = () => {
  const location = useLocation();
  console.log(location.pathname, "PATHNAME");
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    const response: any = await LogoutFunction();
    console.log(response, "RRR");
    if (response?.data?.status) {
      dispatch(clearToken());
      toast.success(response?.data?.message);
      console.log("navigate to login");
      Navigate("/login");
    } else {
      toast.error("Logout error");
    }
  };

  const addImage = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  const handleFileChange = async (e: any) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
       const data:any = {
        file: formData,
       }
      // const response = await addProfileImageFunction(data);
      // console.log(response,"rrrr");
    }

  return (
    <div className="sm:w-96 lg:w-[400px]">
      <div className="sm:ml-0 sm:flex">
        <div className="flex overflow-hidden ">
          <div className="sm:w-96 lg:w-[400px]">
            <div className="sm:ml-20 flex justify-center border-r border-teal-900 h-[99vh]">
              <div className="w-[100vw] sm:w-64 lg:w-[400px] sm:mt-3 ">
                <div className="flex justify-center">
                  <img
                  onClick={addImage}

                    className="w-24 h-24 md:w-32 md:h-32 rounded-full mt-5"
                    src="https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk="
                    alt="DP"
                  />
                   <input
                type="file"
                name="file"
                id="fileInput"
                onChange={handleFileChange}
                hidden
              />
                </div>
                <p className="text-center font-bold text-lg mt-8">Alia Bhatt</p>
                <p className="text-center mt-3">
                  𝒜𝓈𝓌𝒾𝓃 <br />
                  ♡ sdaffssd
                  <br />
                  19sdfdsfd✨ <br />
                  ♡ dsfsdgfsgfds
                  <br />
                </p>
              </div>
              <div className="w-[100vw] sm:w-64 lg:w-[320px] absolute bottom-16 sm:bottom-3 cursor-pointer">
                <div className="grid grid-cols-12 grid-rows-12 text-center text-teal-900 bg-amber-50 mx-5 sm:mx-0  font-medium text-lg">
                  <Link
                    to="/settings/editProfile"
                    className={`${
                      location.pathname === '/settings/editProfile'
                        ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900"
                        : "border-white border-b-4"
                    } col-span-12 row-span-2 col-start-1 row-start-1 w-full py-2 md:py-2.5 sm:px-2 mt-1 `}
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="/settings/activity"
                    className={`${
                      location.pathname =='/settings/activity'
                        ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900"
                        : "border-white border-b-4"
                    } col-span-12 row-span-2 col-start-1 row-start-3 w-full  py-2 md:py-2.5 sm:px-2 mt-1`}
                  >
                    Activity
                  </Link>
                  <Link
                    to="/settings/security"
                    className={`${
                      location.pathname =='/settings/security'
                        ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900"
                        : "border-white border-b-4"
                    } col-span-12 row-span-2 col-start-1 row-start-5 w-full py-2 md:py-2.5 sm:px-2 mt-1 `}
                  >
                    Security
                  </Link>
                  <Link
                    to="/settings/notification"
                    className={`${
                      location.pathname === '/settings/notification'                       ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900"
                        : "border-white border-b-4"
                    } col-span-12 row-span-2 col-start-1 row-start-7 w-full py-2 md:py-2.5 sm:px-2 mt-1 `}
                  >
                    Notification
                  </Link>
                  <Link
                    to="/settings/contactUs"
                    className={`${
                      location.pathname =='/settings/contactUs'
                        ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900"
                        : "border-white border-b-4"
                    } col-span-12 row-span-2 col-start-1 row-start-9 w-full py-2 md:py-2.5 sm:px-2 mt-1 `}
                  >
                    Contact us
                  </Link>
                  {/* <div  className={`${location.pathname === 5 ? "bg-amber-100 rounded-xl text-[#042F2C] font-bold border-b border-teal-900":"border-white border-b-4" } col-span-12 row-span-2 col-start-1 row-start-11 w-full py-2 md:py-2.5 sm:px-2 mt-1`}> */}
                  <div
                    onClick={handleLogout}
                    className={`${
                        "border-white border-b-4"
                    } col-span-12 row-span-2 col-start-1 row-start-11 w-full py-2 md:py-2.5 sm:px-2 mt-1`}
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
