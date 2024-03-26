import { useEffect, useState } from "react";
import {Home,Search,Mail,Clapperboard,Bell,ListCollapse} from "lucide-react";
import profile from '../../../assets/profile.webp'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutFunction } from "../../../utils/api/methods";
import { clearToken } from "../../../utils/ReduxStore/Slice/tokenSlice";
import { toast } from "sonner";
import { persistor } from "../../../utils/ReduxStore/Store/Store";
const NewSideBar = ({setOpenNotification, setOpenSearch}:any) => {
  const location = useLocation();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const userData = useSelector((state: any) => state.persisted.user.userData);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.querySelector(".fixed") as HTMLElement;
      if (modal && !modal.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

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

  return (
    <>
    <div className={` ${location.pathname.startsWith("/message") && location.pathname !== "/message/index" ? "hidden sm:flex" : "" } sm:mr-28 lg:mr-32`}>

      {/* sidebar ------------------------ */}
      <div className="w-full sm:h-full sm:w-[100px] fixed bottom-0 md:w-[110px] lg:w-[122px] h-14 bg-white flex sm:flex-col justify-between rounded-tr-[30px] rounded-br-[30px] border-black shadow-md shadow-[#FADBE1] ">
        {/* sidebar empty fist part  */}
        <div className="hidden sm:block h-1/6"></div>
        {/* sidebar content main part  */}
        <div className="bg-white h-full w-full flex sm:flex-col justify-center ">
          {/* home  */}
          <Link
            to="/"
            className="h-full w-full flex justify-center items-center"
          >
            <div
              className={`sm:bg-[#FADBE1] w-10 h-10   ${
                location.pathname === "/" ? "w-14 h-14" : "w-12 h-12"
              } rounded-full flex justify-center items-center`}
            >
              {location.pathname === "/" ? (
                <div className="rounded-full w-10 h-10 sm:w-[45px] sm:h-[45px] flex justify-center items-center bg-[#C1506D]">
                  <Home className="text-white size-6 sm:size-7" />
                </div>
              ) : (
                <Home className="text-gray-600 size-6 sm:size-7" />
              )}
            </div>
          </Link>
          {/* home  */}
          {/* search */}
          <li
            onClick={()=>setOpenSearch(true)}
            className="h-full w-full flex justify-center items-center"
          >
            <div
              className={`sm:bg-[#FADBE1]  w-12 h-12 rounded-full flex justify-center items-center`}
            >
                <Search className="text-gray-600 size-6 sm:size-7" />
            </div>
          </li>
          {/* search */}
          {/* post  */}
          <Link
            to="/post"
            className=" h-full w-full flex justify-center  items-center"
          >
            <div
              className={`sm:bg-[#FADBE1] w-10 h-10 ${
                location.pathname === "/post" ? "w-14 h-14" : "w-12 h-12"
              } rounded-full flex justify-center items-center`}
            >
              {location.pathname === "/post" ? (
                <>
                  <div className="rounded-full  w-10 h-10  flex justify-center items-center bg-[#C1506D]">
                    <Clapperboard className="text-white size-6 sm:size-6 " />{" "}
                  </div>
                </>
              ) : (
                <>
                  <Clapperboard className="text-gray-600 size-6 sm:size-7 " />{" "}
                </>
              )}
            </div>
          </Link>
          {/* post  */}
          {/* message */}
          <Link
            to="/message/index"
            className=" h-full w-full flex justify-center  items-center"
          >
            <div
              className={`sm:bg-[#FADBE1] w-10 h-10 ${
                location.pathname === "/message/index" ? "w-14 h-14" : "w-12 h-12"
              } rounded-full flex justify-center items-center`}
            >
              {location.pathname === "/message/index" ? (
                <>
                  <div className="rounded-full  w-10 h-10  flex justify-center items-center bg-[#C1506D]">
                    <Mail className="text-white size-6 sm:size-6 " />{" "}
                  </div>
                </>
              ) : (
                <>
                  <Mail className="text-gray-600 bg-none size-6 sm:size-7 " />{" "}
                </>
              )}
            </div>
          </Link>
          {/* message  */}

          <li
            onClick={()=>setOpenNotification(true)}
            className="h-full w-full flex justify-center items-center"
          >
            <div
              className={`sm:bg-[#FADBE1]  w-12 h-12 rounded-full flex justify-center items-center`}
            >
                <Bell className="text-gray-600 size-6 sm:size-7" />
            </div>
          </li>
          {/* profile  */}
          <Link
            to={`/profile/${userData?.userId}`}
            className=" h-full w-full flex justify-center items-center"
          >
            <div className="bg-[#FADBE1] w-19 h-19 rounded-full flex justify-center items-center ">
              <div className="rounded-full w-8 h-8 sm:w-[45px] sm:h-[45px] flex justify-center items-center">
                <img
                 src={  userData?.profile.startsWith('https://graph') ?
                 profile
                   : userData?.profile ?
                   `http://localhost:3000/profile/${userData?.profile}`
                   : profile}
                  className="rounded-full w-full h-full border-2 border-[#C1506D] object-fill"
                  alt=""
                />
              </div>
            </div>
          </Link>
          {/* profile  */}
        </div>
        {/* sidebar content main part  */}
        <div className="hidden h-2/6 sm:flex justify-center items-end p-8">
          {/* more  */}
          <div className=" h-full w-full flex justify-center  items-end ">
            <div className={`bg-[#FADBE1] w-10 h-10 ${"w-12 h-12"} rounded-full flex justify-center items-center`}>
              <>
                <ListCollapse className="text-gray-600 size-6 sm:size-6 " onClick={()=>setIsOpen(!isOpen)}/>
              </>
              {isOpen && (
                <div className="absolute left-3 bottom-20 w-40 bg-[#fff] rounded-lg shadow-lg z-10 border border-black">
                  <ul>
                    <li
                      className="py-2 px-4 hover:bg-[#C1506D] hover:text-amber-50 border-b rounded-t-lg border-black cursor-pointer"
                    >
                       <Link to="/settings" onClick={()=>setIsOpen(false)}>
                      Settings
                    </Link>
                    </li>
                    <li
                      className="py-2 px-4 hover:bg-[#C1506D] hover:text-amber-50 border-b border-black cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                    <li onClick={()=>setIsOpen(!isOpen)}
                     className="py-2 px-4 hover:bg-[#C1506D] hover:text-amber-50 cursor-pointer">
                      Cancel
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* more  */}
        </div>

        {/* sidebar content setting part  */}
      </div>
      {/* sidebar --------------------------*/}
      </div>

    </>

  );
};

export default NewSideBar;
