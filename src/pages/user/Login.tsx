import {
  GetUserDataFunction,
  LoginFuntion,
  LoginWithFacebook,
} from "../../utils/api/methods/AuthService/post";
import { addUser, clearUser } from "../../utils/ReduxStore/Slice/userSlice";
import { addToken } from "../../utils/ReduxStore/Slice/tokenSlice";
import { LoginWithGoogle } from "../../utils/api/methods/AuthService/post";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import mongoose from "mongoose";
import {
  LoginFormData,
  useValidate,
} from "../../utils/formValidation/LoginValidation";
import { FacebookAuth, GoogleAuth } from "../../utils/firebase/firebase";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import SaveUserDataInRedux from "../../helper/ReduxHelper/SaveUserInRedux";

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
  const userDataFromRedux = useSelector(
    (state: any) => state.persisted.user.userData
  );
  const token = useSelector((state: any) => state.persisted.token.token);
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

          if (response?.data?.newUser) {
            toast.success(response?.data?.message);
            Navigate("/chooseinterest");
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
  
            // await SaveUserDataInRedux(userData)
            toast.success(response?.data?.message);
            Navigate("/");
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

            if (response?.data?.newUser) {
              toast.success(response?.data?.message);
              Navigate("/chooseinterest");
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
    
              // await SaveUserDataInRedux(userData)  
              toast.success(response?.data?.message);
              Navigate("/");
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
      const userEmail = { email: userExist?.data?.user?.email };      
      const response: any = await GetUserDataFunction(userEmail);
      
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
        toast.success(response?.data?.data?.message);
        Navigate("/");

    }
    
  };
  
  
  return (
    <>
      <div className="relative flex justify-center md:items-center align-middle bg-gray-50 h-[100vh]">
        <div className="relative bg-amber-50 px-6 pt-10 pb-8 shadow-xl overflow-hidden flex justify-center ring-1 w-[100vw] md:h-[80vh] ring-gray-900/5 rounded-3xl sm:max-w-lg sm:rounded-xl sm:px-10">
          <form
            className="grid grid-cols-8 grid-rows-14 gap-3 text-center"
            onSubmit={handleSubmit(formsubmit)}
          >
            {/* header */}
            <div className="col-span-4 col-start-2 row-start-2 mt-2">
              <h1 className="text-3xl md:text-4xl lg:text-4xl font-roboto text-teal-800 text-start">
                Login
              </h1>
            </div>

            {/* email input */}
            <div className="col-span-8 col-start-2 col-end-8 row-start-4">
              <p className="text-start text-teal-800 font-light">email</p>
              <input
                className="p-5 outline-none border border-amber-100 h-10 w-full rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                placeholder="abc@gmai.com"
                type="text"
                {...register("email")}
              />
              <p className="text-red-600 text-start text-xs">
                {errors && errors.email && <p>{errors.email.message}</p>}
              </p>
            </div>

            {/* password input */}
            <div className="col-span-8 col-start-2 col-end-8 row-start-5 relative ">
              <p className="text-start text-teal-800 font-light">Password</p>
              <input
                className=" p-5 outline-none border border-amber-100 h-10 w-full rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                placeholder="********"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 mr-3 mt-2 text-teal-900 "
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
              <Link
                to="/forgotpassword"
                className="flex justify-end text-teal-800 hover:underline"
              >
                forgotpassword?
              </Link>
              <p className="text-red-600 text-xs text-start">
                {errors && errors.password && <p>{errors.password.message}</p>}
              </p>
            </div>

            {/* submit */}
            <div className="col-span-2 lg:col-span-4 mt-4 col-start-3 lg:col-start-3 col-end-7 row-start-6">
              <button
                type="submit"
                className="py-2 px-3 flex justify-center items-center bg-teal-800 hover:bg-teal-600 focus:ring-teal-900 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg max-w-md"
              >
                Sign in
              </button>
            </div>
            <div className="col-span-4 col-start-3 row-start-8 p-1">
              <p className="text-teal-800 font-light">or continue with</p>
            </div>
            <button
              onClick={handleGoogle}
              className="col-start-3   row-start-9"
            >
              {
                <div>
                  <img src="/fonts/google.png" alt="G" />
                </div>
              }
            </button>
            <button
              type="button"
              onClick={SignInWithFacebook}
              className="col-start-6 row-start-9"
            >
              <img src="/fonts/facebook.png" alt="G" />
            </button>

            {/* Create account */}
            <div className="col-span-4 col-start-2 row-start-10">
              <Link to={"/signUp"}>
                <p className="text-teal-800 font-roboto font-light text-sm whitespace-nowrap ml-8 mt-5 ">
                  Don't have an account ?{" "}
                  <span className="whitespace-nowrap font-medium hover:underline">
                    {" "}
                    Register free{" "}
                  </span>
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
