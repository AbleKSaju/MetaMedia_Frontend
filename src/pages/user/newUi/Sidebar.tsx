import { useEffect, useState } from "react";
import {
  Home,
  Search,
  Mail,
  Clapperboard,
  Bell,
  ListCollapse,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutFunction } from "../../../utils/api/methods";
import { clearToken } from "../../../utils/ReduxStore/Slice/tokenSlice";
import { toast } from "sonner";
import { persistor } from "../../../utils/ReduxStore/Store/Store";
import SearchComponent from "./Search";
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
      {/* sidebar ------------------------ */}
      <div className="w-full sm:h-full sm:w-[140px]  md:w-[150px] lg:w-[120px] h-1/6 bg-white flex sm:flex-col justify-between rounded-tr-[30px] rounded-br-[30px] border-black shadow-md shadow-[#FADBE1] ">
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
              className={`bg-[#FADBE1] w-10 h-10   ${
                location.pathname === "/" ? "w-14 h-14" : "w-12 h-12"
              } rounded-full flex justify-center items-center`}
            >
              {location.pathname === "/" ? (
                <div className="rounded-full w-5/6 h-5/6 sm:w-[45px] sm:h-[45px] flex justify-center items-center bg-[#C1506D]">
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
              className={`bg-[#FADBE1]  w-12 h-12 rounded-full flex justify-center items-center`}
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
              className={`bg-[#FADBE1] w-10 h-10 ${
                location.pathname === "/post" ? "w-14 h-14" : "w-12 h-12"
              } rounded-full flex justify-center items-center`}
            >
              {location.pathname === "/post" ? (
                <>
                  <div className="rounded-full w-5/6 h-5/6 flex justify-center items-center bg-[#C1506D]">
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
            to="/message"
            className=" h-full w-full flex justify-center  items-center"
          >
            <div
              className={`bg-[#FADBE1] w-10 h-10 ${
                location.pathname === "/message" ? "w-14 h-14" : "w-12 h-12"
              } rounded-full flex justify-center items-center`}
            >
              {location.pathname === "/message" ? (
                <>
                  <div className="rounded-full w-5/6 h-5/6 flex justify-center items-center bg-[#C1506D]">
                    <Mail className="text-white size-6 sm:size-6 " />{" "}
                  </div>
                </>
              ) : (
                <>
                  <Mail className="text-gray-600 size-6 sm:size-7 " />{" "}
                </>
              )}
            </div>
          </Link>
          {/* message  */}

          {/* notification  */}
          <li
            onClick={()=>setOpenNotification(true)}
            className="h-full w-full flex justify-center items-center"
          >
            <div
              className={`bg-[#FADBE1]  w-12 h-12 rounded-full flex justify-center items-center`}
            >
                <Bell className="text-gray-600 size-6 sm:size-7" />
            </div>
          </li>
          {/* <Link
            to="/notification"
            className="hidden h-full w-full sm:flex justify-center  items-center"
          >
            <div
              className={`bg-[#FADBE1] w-10 h-10 ${
                location.pathname === "/notification"
                  ? "w-14 h-14"
                  : "w-12 h-12"
              } rounded-full flex justify-center items-center`}
            >
              {location.pathname === "/notification" ? (
                <>
                  <div className="rounded-full w-5/6 h-5/6 flex justify-center items-center bg-[#C1506D]">
                    <Bell className="text-white size-6 sm:size-7 " />{" "}
                  </div>
                </>
              ) : (
                <>
                  <Bell className="text-gray-600 size-6 sm:size-7 " />{" "}
                </>
              )}
            </div>
          </Link> */}

          {/* notifiactoin  */}
          {/* profile  */}
          <Link
            to={`/profile/${userData?.userId}`}
            className=" h-full w-full sm:flex justify-center  items-center"
          >
            <div className="bg-[#FADBE1] w-10 h-10 rounded-full flex justify-center items-center ">
              <div className="rounded-full w-5/6 h-5/6 sm:w-[45px] sm:h-[45px] flex justify-center items-center">
                <img
                  src="https://i.pinimg.com/564x/66/af/ad/66afadeda60eb0192a850b46bc75f78a.jpg"
                  className="rounded-full border-2 border-[#C1506D] object-cover"
                  alt=""
                />
              </div>
            </div>
          </Link>
          {/* profile  */}
        </div>
        {/* sidebar content main part  */}
        {/* sidebar content setting part  */}
        <div className="hidden h-2/6 sm:flex justify-center items-end p-8">
          {/* more  */}
          <div className=" h-full w-full flex justify-center  items-end ">
            <div
              className={`bg-[#FADBE1] w-10 h-10 ${"w-12 h-12"} rounded-full flex justify-center items-center`}
            >
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
                    <li  className="py-2 px-4 hover:bg-[#C1506D] hover:text-amber-50 border-b border-black cursor-pointer">
                      forward
                    </li>
                    <li
                      className="py-2 px-4 hover:bg-[#C1506D] hover:text-amber-50 rounded-b-lg cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
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
    </>
  );
};

export default NewSideBar;
