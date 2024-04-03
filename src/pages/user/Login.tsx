import {
  GetUserDataFunction,
  LoginFuntion,
  LoginWithFacebook,
} from "../../utils/api/methods/AuthService/post";
import { addUser, clearUser } from "../../utils/ReduxStore/Slice/userSlice";
import { addToken } from "../../utils/ReduxStore/Slice/tokenSlice";
import { LoginWithGoogle } from "../../utils/api/methods/AuthService/post";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import mongoose from "mongoose";
import {
  LoginFormData,
  useValidate,
} from "../../utils/formValidation/LoginValidation";
import { FacebookAuth, GoogleAuth } from "../../utils/firebase/firebase";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { clearAdmin,addAdminData } from "../../utils/ReduxStore/Slice/adminSlice";
import { addAdminToken } from "../../utils/ReduxStore/Slice/adminTokenSlice";

interface ResponseData {
  email?: string;
  name?: string;
  userName?: string;
  dateOfBirth?: string;
  gender?: string;
  location?: string;
  phoneNumber?: string;
  interests?: string[];
  bio?: string;
  userId: mongoose.Schema.Types.ObjectId;
  profile: string;
  isGoogle: boolean;
  isFacebook: boolean;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const SignInWithFacebook = async (e: any) => {
    e.preventDefault();
    await FacebookAuth().then(async (data: any) => {
      const userData = {
        profile: data.user.photoURL,
        email: data.user.email,
        name: data.user.displayName,
        isGoogle: false,
        isFacebook: true,
      };

      if (data.user.email) {
        const response: any = await LoginWithFacebook(userData);

        if (response?.data?.status) {
          // setTimeout(() => {
          //   SaveUserDataInRedux(response);
          // }, 3000);
          const data: ResponseData = {
            email: response.data.user.email ?? "",
            name: response.data.user.name ?? "",
            userName: response.data.user.userName ?? "",
            userId: response.data.user._id ?? "",
            profile: response.data.user.profile ?? "",
            isGoogle: response.data.user.isGoogle ?? "",
            isFacebook: response.data.user.isFacebook ?? "",
            dateOfBirth: response.data.user.dateOfBirth ?? "",
            gender: response.data.user.gender ?? "",
            location: response.data.user.location ?? "",
            phoneNumber: response.data.user.phoneNumber ?? "",
            interests: response.data.user.interests ?? [],
            bio: response.data.user.bio ?? "",
          };

          dispatch(clearUser());
          dispatch(addUser(data));
          dispatch(addToken(response.data.accesstoken));
          localStorage.setItem('accesstoken',response.data.accesstoken)

          if (response?.data?.newUser) {
            toast.success(response?.data?.message);
            Navigate("/chooseinterest", { replace: true });
          } else {
            const userEmail = { email: response?.data?.user?.email };
            const userData: any = await GetUserDataFunction(userEmail);
            // setTimeout(() => {
            //   SaveUserDataInRedux(userData);
            // }, 100);

            const data: ResponseData = {
              email: userData.data.user.email ?? "",
              name: userData.data.user.name ?? "",
              userName: userData.data.user.userName ?? "",
              userId: userData.data.user._id ?? "",
              profile: userData.data.user.profile ?? "",
              isGoogle: userData.data.user.isGoogle ?? "",
              isFacebook: userData.data.user.isFacebook ?? "",
              dateOfBirth: userData.data.user.dateOfBirth ?? "",
              gender: userData.data.user.gender ?? "",
              location: userData.data.user.location ?? "",
              phoneNumber: userData.data.user.phoneNumber ?? "",
              interests: userData.data.user.interests ?? [],
              bio: userData.data.user.bio ?? "",
            };
            dispatch(clearUser());
            dispatch(addUser(data));
            dispatch(addToken(response.data.accesstoken));
            localStorage.setItem('accesstoken',response.data.accesstoken)

            // await SaveUserDataInRedux(userData)
            toast.success(response?.data?.message);
            Navigate("/", { replace: true });
          }
        } else {
          toast.error(response?.data?.message);
        }
      } else {
        toast.error("email not found");
      }
    });
  };

  //-------------
  const handleGoogle = async (e: any) => {
    e.preventDefault();
    await GoogleAuth().then(async (data: any) => {
      const userData = {
        profile: data.user.photoURL,
        email: data.user.email,
        name: data.user.displayName,
        isGoogle: true,
        isFacebook: false,
      };

      if (data.user.email) {
        const response: any = await LoginWithGoogle(userData);
        if (response?.data?.status) {
          // setTimeout(() => {
          //   SaveUserDataInRedux(response);
          // }, 3000);
          const data: ResponseData = {
            email: response.data.user.email ?? "",
            name: response.data.user.name ?? "",
            userName: response.data.user.userName ?? "",
            userId: response.data.user._id ?? "",
            profile: response.data.user.profile ?? "",
            isGoogle: response.data.user.isGoogle ?? "",
            isFacebook: response.data.user.isFacebook ?? "",
            dateOfBirth: response.data.user.dateOfBirth ?? "",
            gender: response.data.user.gender ?? "",
            location: response.data.user.location ?? "",
            phoneNumber: response.data.user.phoneNumber ?? "",
            interests: response.data.user.interests ?? [],
            bio: response.data.user.bio ?? "",
          };

          dispatch(clearUser());
          dispatch(addUser(data));
          dispatch(addToken(response.data.accesstoken));
          localStorage.setItem('accesstoken',response.data.accesstoken)
          if (response?.data?.newUser) {
            toast.success(response?.data?.message);
            Navigate("/chooseinterest", { replace: true });
          } else {
            const userEmail = { email: response?.data?.user?.email };
            const userData: any = await GetUserDataFunction(userEmail);
            // setTimeout(() => {
            //   SaveUserDataInRedux(userData);
            // }, 100);
            const data: ResponseData = {
              email: userData.data.user.email ?? "",
              name: userData.data.user.name ?? "",
              userName: userData.data.user.userName ?? "",
              userId: userData.data.user._id ?? "",
              profile: userData.data.user.profile ?? "",
              isGoogle: userData.data.user.isGoogle ?? "",
              isFacebook: userData.data.user.isFacebook ?? "",
              dateOfBirth: userData.data.user.dateOfBirth ?? "",
              gender: userData.data.user.gender ?? "",
              location: userData.data.user.location ?? "",
              phoneNumber: userData.data.user.phoneNumber ?? "",
              interests: userData.data.user.interests ?? [],
              bio: userData.data.user.bio ?? "",
            };

            dispatch(clearUser());
            dispatch(addUser(data));
            dispatch(addToken(response.data.accesstoken));
            localStorage.setItem('accesstoken',response.data.accesstoken)
            // await SaveUserDataInRedux(userData)
            toast.success(response?.data?.message);
            Navigate("/", { replace: true });
          }
        } else {
          toast.error(response?.data?.message);
        }
      } else {
        toast.error("Your google email is not veified ..");
      }
    });
  };
  //-------------

  const { errors, handleSubmit, register } = useValidate();

  //form data set in
  const formsubmit = async (Data: LoginFormData) => {
    const userExist: any = await LoginFuntion({ ...Data });
    if (userExist.data.status == false) {
     
      toast.error(userExist?.data?.message);
    } else {
     
      console.log(userExist,"userExistuserExistuserExistuserExistuserExist");
      if(userExist.data.admin){
        const userEmail = { email: userExist?.data?.user?.email };
        const response: any = await GetUserDataFunction(userEmail);
        console.log(response,"responseresponse");
        const adminData: any = {
          email: response.data.user.email ?? "",
          name: response.data.user.name ?? "",
          userId: response.data.user._id ?? "",
        };
        dispatch(clearAdmin());
        dispatch(addAdminData(adminData));
        dispatch(addAdminToken(userExist.data.accesstoken));
        toast.success(response?.data?.data?.message);
        Navigate("/admin", { replace: true });
        localStorage.setItem('accesstoken',userExist.data.accesstoken)
      }else{
      const userEmail:any = {email: userExist?.data?.user?.email };
     
      const response: any = await GetUserDataFunction(userEmail);
      const userData: ResponseData = {
        email: response.data.user.email ?? "",
        name: response.data.user.name ?? "",
        userName: response.data.user.userName ?? "",
        userId: response.data.user._id ?? "",
        profile: response.data.user.profile ?? "",
        isGoogle: response.data.user.isGoogle ?? "",
        isFacebook: response.data.user.isFacebook ?? "",
        dateOfBirth: response.data.user.dateOfBirth ?? "",
        gender: response.data.user.gender ?? "",
        location: response.data.user.location ?? "",
        phoneNumber: response.data.user.phoneNumber ?? "",
        interests: response.data.user.interests ?? [],
        bio: response.data.user.bio ?? "",
      };
      dispatch(clearUser());
      dispatch(addUser(userData));
      dispatch(addToken(userExist.data.accesstoken));
      localStorage.setItem('accesstoken',userExist.data.accesstoken)
      toast.success(response?.data?.data?.message);
      Navigate("/", { replace: true });
    }

    }
  };

  return (
    <>
      <div className="h-screen w-screen  flex fixed">
        <div className="flex justify-center w-full ">
          <div className="w-full md:w-7/12 h-full  flex justify-center items-center md:pl-7">
            <form 
              onSubmit={handleSubmit(formsubmit)}
              className="w-full sm:w-8/12 md:w-10/12 lg:w-8/12 h-5/6  flex justify-evenly flex-col items-center"
            >
              <div className="w-full h-24   flex justify-center md:justify-start  md:items-start items-center">
                <h1 className="text-[#C1506D]  font-semibold font-sans text-2xl  md:text-center md:text-2xl  pl-5     ">
                  Welcome Back !
                </h1>
              </div>
              <div className="w-full h-32 flex  justify-center p-5 flex-col gap-2">
                <label className="pl-1 font-semibold text-[#C1506D]">
                  Email
                </label>
                <div>
                <input
                  type="email"
                  placeholder="abc@gmai.com"
                  className="outline-none border border-[#C1506D] w-full rounded-md pl-2 h-10"
                  {...register("email")}
                />
                </div>
                <p className="text-red-600 text-start text-xs">
                  {errors && errors.email && <p>{errors.email.message}</p>}
                </p>
              </div>
              <div className="w-full h-32 flex justify-center p-5 flex-col gap-2">
                <label className="pl-1 font-semibold text-[#C1506D]">
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    className="outline-none border w-full border-[#C1506D] rounded-md pl-2 pr-10 h-10"
                    placeholder="********"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-0 bottom-0 flex items-center justify-center"
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
                <p className="text-red-600 text-xs text-start">
                  {errors && errors.password && (
                    <p>{errors.password.message}</p>
                  )}
                </p>
              </div>
              <div className="w-full h-36   flex justify-center items-center p-5">
                <button type="submit" className="w-full h-10 border border-[#C1506D] bg-[#C1506D] rounded-md    text-white font-sans   font-bold text-sm  ">
                  Sign In
                </button>
              </div>
              <Link to={"/signUp"}>
                <p className="text-black font-roboto font-light text-sm whitespace-nowrap ml-8 mt-2 ">
                  Don't have an account ? {" "}
                  <span className="whitespace-nowrap font-medium hover:underline">
                    Register free{" "}
                  </span>
                </p>
              </Link>
              <div className="w-full h-32   flex justify-evenly items-center">
                <div className="inline-flex items-center justify-center w-full">
                  <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded " />
                  <div className="absolute px-4  bg-white text-[#C1506D] ">
                    or
                  </div>
                </div>
              </div>
              <div className="w-full h-32   flex justify-evenly items-center">
                <div className="w-5/12 border h-10 rounded-md border-[#C1506D] flex items-center pl-2 justify-center ">
                  <img
                    src="/fonts/google.png"
                    className="w-6 h-6 rounded-full object-fill"
                    alt=""
                  />
                  <p onClick={handleGoogle}
                   className="text-sm pl-2">Sign in with google</p>
                </div>
                <div className="w-5/12 border h-10 rounded-md border-[#C1506D] items-center flex pl-2 justify-center">
                  <img
                    src="/fonts/facebook.png"
                    className="w-6 h-6 rounded-full object-fill"
                    alt=""
                  />
                  <p onClick={SignInWithFacebook}
                  className="text-sm pl-2">Sign in with Facebook</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;