import {
  ChangePasswordFormData,
  useChangePasswordValidation,
} from "../../utils/formValidation/ChangePasswordValidation";
import { ChangePasswordFunction } from "../../utils/api/methods/AuthService/post";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const ChangePasswordComponent = ({ changePassword,setChangePassword }: any) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const Navigate = useNavigate();
  const wrapperRef: any = useRef(null);
  const userData=useSelector((state:any)=>state.persisted.user.userData)

  const { errors, handleSubmit, register } = useChangePasswordValidation();
  const formSubmit = async (Data: ChangePasswordFormData) => {
    const response: any = await ChangePasswordFunction({ ...Data,email:userData.email });
    console.log(response, "resss");
    if (response.data.status) {
      toast.success(response?.data?.message);
      setChangePassword(!changePassword)
    } else {
      toast.error(response?.data?.message);
    }
  };

  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setChangePassword(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur bg-opacity-50 bg-black"
      ref={wrapperRef}
    >
      <div className="relative w-72 sm:w-[450px] h-[400px] sm:h-[500px] bg-white border border-black rounded-lg">
        <div className="flex h-[370px] sm:h-[500px] flex-col p-1">
          <button
            onClick={() => {
              setChangePassword(false);
            }}
            className="relative w-full"
          >
            <X size={22} className="absolute right-2 top-2" />
          </button>

          <div>
            <p className="text-center font-bold mt-3"> Change Password</p>
          </div>
          <hr className="mt-3"/>
          <div className=" h-80 sm:h-96 w-auto mx-4 sm:mx-16 sm:pt-5 scrollbar-hide overflow-y-auto ">
            <form
              className="grid grid-cols-8 grid-rows-15 gap-3 text-center"
              onSubmit={handleSubmit(formSubmit)}
            >
              <div className="col-span-8 sm:mt-1 col-start-1 col-end-9 row-start-2 relative">
                <p className="text-start text-black font-light">old password</p>
                <input
                  className="p-5 outline-none border border-[#C1506D] h-10 w-full rounded-md text-black placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                  placeholder="********"
                  type={showOldPassword ? "text" : "password"}
                  {...register("oldPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-0 mr-3 mt-2 text-black"
                >
                  {showOldPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>

                <p className="text-red-600 text-xs text-start">
                  {errors && errors.oldPassword && (
                    <p>{errors.oldPassword.message}</p>
                  )}
                </p>
              </div>
              <div className="col-span-8 sm:mt-1 col-start-1 col-end-9 row-start-3 relative">
                <p className="text-start text-black font-light">new password</p>
                <input
                  className="p-5 outline-none border border-[#C1506D] h-10 w-full rounded-md text-black placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                  placeholder="********"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 mr-3 mt-2 text-black"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>

                <p className="text-red-600 text-xs text-start">
                  {errors && errors.password && (
                    <p>{errors.password.message}</p>
                  )}
                </p>
              </div>
              <div className="col-span-8 sm:mt-1 col-start-1 col-end-9 row-start-4 relative ">
                <p className="text-start text-black font-light">
                  confirm password
                </p>
                <input
                  className=" p-5 outline-none border border-[#C1506D] h-10 w-full rounded-md text-black placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                  placeholder="********"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmpassword")}
                />
                <button
                  type="button"
                  onClick={() => setConfirmShowPassword(!showConfirmPassword)}
                  className="absolute right-0 mr-3 mt-2 text-black"
                >
                  {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>

                <p className="text-red-600 text-xs text-start">
                  {errors && errors.confirmpassword && (
                    <p>{errors.confirmpassword.message}</p>
                  )}
                </p>
                <p />
              </div>
              <div className={`col-span-8 col-start-3 col-end-7 ${errors.confirmpassword || errors.password ?"row-start-6":"row-start-8"}`}>
                <button
                  type="submit"
                  className="py-2 px-3 flex justify-center items-center hover:bg-[#cb5a76] bg-[#C1506D] focus:ring-black focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg max-w-md"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    //   <div className="relative flex justify-center md:items-center align-middle overflow-hidden bg-red-500 sm:h-[100vh]">
    //     <div className="relative bg-amber-50 px-6 pt-10 pb-8 shadow-xl overflow-hidden flex justify-center ring-1 w-[100vw] h-[100vh] md:h-[80vh] ring-gray-900/5 rounded-3xl sm:max-w-lg sm:rounded-xl sm:px-10">

    //     </div>
    //   </div>
  );
};

export default ChangePasswordComponent;
