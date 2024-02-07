import { LoginFuntion, LoginWithFacebook } from "../../utils/api/methods/AuthService/post";
import { addUser, clearUser } from "../../utils/ReduxStore/Slice/userSlice";
import { addToken } from '../../utils/ReduxStore/Slice/tokenSlice'
import { LoginWithGoogle } from "../../utils/api/methods/AuthService/post";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import mongoose from "mongoose";
import {LoginFormData,useValidate} from "../../utils/formValidation/LoginValidation";
import { FacebookAuth, GoogleAuth } from "../../utils/firebase/firebase";




const Login = () => {
    const userData = useSelector((state:any) => state.persisted.user.userData);
    const token = useSelector((state:any) => state.persisted.token.token);
    
  console.log("user", userData);
  console.log("token", token);

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
      console.log(userData,"UD");
      
      if (data.user.email) {
        const response: any = await LoginWithFacebook(userData);
        console.log(response,"RESSS");
        
        if (
          response?.data?.status &&
          response?.data?.user?.interest?.length < 2 
        ) {
          const data: ResponseData = {
            email: response.data.user.email,
            name: response.data.user.name,
            userId: response.data.user._id,
            profile: response.data.user.profile,
            isGoogle: response.data.user.isGoogle,
            isFacebook: response.data.user.isFacebook,
          };
          console.log(data, "dataaa");
          dispatch(clearUser());
          dispatch(addUser(data));
          dispatch(addToken(response.data.accesstoken))
          if (data) {
            toast.success(response?.data?.message);
            Navigate("/chooseinterest");
          }
        } else if (response?.data?.status) {
          const data: ResponseData = {
            email: response.data.user.email,
            name: response.data.user.name,
            userId: response.data.user._id,
            profile: response.data.user.profile,
            isGoogle: response.data.user.isGoogle,
            isFacebook: response.data.user.isFacebook,
          };
          console.log(data, "dataaa");
          dispatch(clearUser());
          dispatch(addUser(data));
          dispatch(addToken(response.data.accesstoken))
          if (data) {
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
  const handleGoogle = async(e: any) => {
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
        console.log(response,'KKKKKK');
        
        if (
          response?.data?.status &&
          response?.data?.user?.interest?.length < 2 
        ) {
            console.log('ENter');
            
          const data: ResponseData = {
            email: response.data.user.email,
            name: response.data.user.name,
            userId: response.data.user._id,
            profile: response.data.user.profile,
            isGoogle: response.data.user.isGoogle,
            isFacebook: response.data.user.isFacebook,
          };
          console.log(data, "dataaa");
          dispatch(clearUser());
          dispatch(addUser(data));
          dispatch(addToken(response.data.accesstoken))
          if (data) {
            toast.success(response?.data?.message);
            
            Navigate("/chooseinterest");
          }
        } else if (response?.data?.status) {
          const data: ResponseData = {
            email: response.data.user.email,
            name: response.data.user.name,
            userId: response.data.user._id,
            profile: response.data.user.profile,
            isGoogle: response.data.user.isGoogle,
            isFacebook: response.data.user.isFacebook,
          };
          console.log(data, "dataaa");
          dispatch(clearUser());
          dispatch(addUser(data));
          dispatch(addToken(response.data.accesstoken))
          if (data) {
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

  interface ResponseData {
    email?: string;
    name?: string;
    userId: mongoose.Schema.Types.ObjectId;
    profile: string;
    isGoogle: boolean;
    isFacebook: boolean;
  }

  //form data set in
  const formsubmit = async (Data: LoginFormData) => {
    const response: any = await LoginFuntion({ ...Data });
    if (response.data.status==false) {
      toast.error(response?.data?.message);
    } else {
      const data: ResponseData = {
        email: response.data.user.email,
            name: response.data.user.name,
            userId: response.data.user._id,
            profile: response.data.user.profile,
            isGoogle: response.data.user.isGoogle,
            isFacebook: response.data.user.isFacebook,
      };
      dispatch(clearUser());
      dispatch(addUser(data));
      dispatch(addToken(response.data.accesstoken))
      console.log(response,"RESPONSED");
      toast.success(response?.data?.message);
      if (
        response?.data?.status &&
        response?.data?.user?.interest?.length < 2 
      ){
        console.log("LOADING TO chooseinterest ");
        Navigate("/chooseinterest");
      }else{
        Navigate("/");
      }
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
            <div className="col-span-8 col-start-2 col-end-8 row-start-5 ">
              <p className="text-start text-teal-800 font-light">Password</p>
              <input
                className=" p-5 outline-none border border-amber-100 h-10 w-full rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                placeholder="********"
                type="text"
                {...register("password")}
              />
              <Link to="/forgotpassword" className="flex justify-end text-teal-800 hover:underline">forgotpassword?</Link>
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
