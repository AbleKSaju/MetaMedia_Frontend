import { useEffect, useState } from "react";
import {
  Home,
  Clapperboard,
  Users,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutFunction } from "../../utils/api/methods";
import { toast } from "sonner";
import { persistor } from "../../utils/ReduxStore/Store/Store";
import { clearAdminToken } from "../../utils/ReduxStore/Slice/adminTokenSlice";
import { clearAdmin } from "../../utils/ReduxStore/Slice/adminSlice";
const NewSideBar = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

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

  const handleAdminLogout = async (e: any) => {
    e.preventDefault();
    const response: any = await LogoutFunction();
    if (response?.data?.status) {
      dispatch(clearAdminToken());
      dispatch(clearAdmin());
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
            to="/admin"
            className="h-full w-full flex justify-center items-center"
          >
            <div
              className={`bg-[#FADBE1] w-10 h-10   ${
                location.pathname === "/admin" ? "w-14 h-14" : "w-12 h-12"
              } rounded-full flex justify-center items-center`}
            >
              {location.pathname === "/admin" ? (
                <div className="rounded-full w-5/6 h-5/6 sm:w-[45px] sm:h-[45px] flex justify-center items-center bg-[#C1506D]">
                  <Home className="text-white size-6 sm:size-7" />
                </div>
              ) : (
                <Home className="text-gray-600 size-6 sm:size-7" />
              )}
            </div>
          </Link>
          {/* home  */}
          <Link
            to="/admin/users"
            className="h-full w-full flex justify-center items-center"
          >
            <div
              className={`bg-[#FADBE1] w-10 h-10 ${
                location.pathname === "/admin/users" ? "w-14 h-14" : "w-12 h-12"
              } rounded-full flex justify-center items-center`}
            >
              {location.pathname === "/admin/users" ? (
                <div className="rounded-full w-5/6 h-5/6 flex justify-center items-center bg-[#C1506D]">
                  <Users className="text-white size-6 sm:size-6" />
                </div>
              ) : (
                <Users className="text-gray-600 size-6 sm:size-7" />
              )}
            </div>
          </Link>
          {/* post  */}
          <Link
            to="/admin/posts"
            className=" h-full w-full flex justify-center  items-center"
          >
            <div
              className={`bg-[#FADBE1] w-10 h-10 ${
                location.pathname === "/admin/posts" ? "w-14 h-14" : "w-12 h-12"
              } rounded-full flex justify-center items-center`}
            >
              {location.pathname === "/admin/posts" ? (
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
          <div
            onClick={handleAdminLogout}
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
                    <LogOut className="text-white size-6 sm:size-6 " />{" "}
                  </div>
                </>
              ) : (
                <>
                  <LogOut className="text-gray-600 size-6 sm:size-7 " />{" "}
                </>
              )}
            </div>
          </div>
          {/* message  */}
        </div>
        {/* sidebar content main part  */}
        {/* sidebar content setting part  */}
        {/* <div className="hidden h-2/6 sm:flex justify-center items-end p-8">
          {/* more  */}
          <div className=" h-full w-full flex justify-center items-end ">
           
          {/* more  */}
        </div> 

        {/* sidebar content setting part  */}
      </div>
      {/* sidebar --------------------------*/}
    </>
  );
};

export default NewSideBar;
