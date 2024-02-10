
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import {RegisterFormData,useRegisterValidate,} from "../../utils/formValidation/SignUpValidation";
import { FacebookAuth ,GoogleAuth} from "../../utils/firebase/firebase";
import { addUser, clearUser } from "../../utils/ReduxStore/Slice/userSlice";
import { addToken,clearToken } from "../../utils/ReduxStore/Slice/tokenSlice";
import { useDispatch,useSelector } from "react-redux";
import {
  LoginWithFacebook,
  LoginWithGoogle,
  SignUpFunction,
} from "../../utils/api/methods/AuthService/post";
import { ResponseData } from "src/utils/interface/userInterface";


const SignUp = () => {
  const userData=useSelector((state:any)=>state.persisted.user.userData)
  console.log(userData,"USERRRRDDAAATTAAA");
  
  const dispatch = useDispatch()
  const Navigate = useNavigate();

  // const responseMessage: any = (response: any) => {
  //   const decode: any = jwtDecode(response.credential);
  //   console.log(decode);
  // };
  // const errorMessage: any = (error: any) => {
  //   console.log(error);
  // };

  const { errors, handleSubmit, register } = useRegisterValidate();

  // const SignInWithFacebook=()=>{
  //   const user:any=FacebookAuth()
  //   console.log("user :",user); 
  // }

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
          console.log(response,"RESSSS");
          
          if (
            response?.data?.status 
          //  &&
          //   response?.data?.user?.interest?.length < 2 
          // ) {
          //   const data: ResponseData = {
          //     email: response.data.user.email,
          //   name: response.data.user.name,
          //   userId: response.data.user._id,
          //   profile: response.data.user.profile,
          //   isGoogle: response.data.user.isGoogle,
          //   isFacebook: response.data.user.isFacebook,
          //   };
          //   dispatch(clearUser());
          //   dispatch(addUser(data));
          //   const token=response.data.accesstoken.toString()
          //   console.log(token,"TOK!!!!!");
          //   dispatch(addToken(token))
          //   if (data) {
          //     toast.success(response?.data?.message);
          //     console.log("Entering to chooseinterest");
          //     Navigate("/chooseinterest");
          //   }
          // } else if (response?.data?.status
          ) {
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
            const token=response.data.accesstoken.toString()
            console.log(token,"TOK");
            dispatch(addToken(token))
            if (data) {
              toast.success(response?.data?.message);              
              Navigate("/chooseinterest");
            }
          } else {
            toast.error(response?.data?.message);
          }
        } else {
          toast.error("email not found");
        }
      });
    };


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
  const formSubmit = async (Data: RegisterFormData) => {
    const response: any = await SignUpFunction({ ...Data });
    if (response?.data?.status) {
      Navigate("/verifyOtp");
    } else {
      toast.error(response?.data?.message);
    }
  };

  return (
    <>
      <div className="relative flex justify-center align-middle mt-16">

        {/* wrapper div  */}
        <div className="relative bg-amber-50 px-6 pt-10 pb-8 shadow-xl overflow-hidden flex justify-center ring-1 w-[100vw] md:h-[80vh] ring-gray-900/5 rounded-3xl sm:max-w-lg sm:rounded-xl sm:px-10">
          <form
            className="grid grid-cols-8 grid-rows-14 gap-3 text-center"
            onSubmit={handleSubmit(formSubmit)}
          >
            {/* header */}
            <div className="col-span-4 col-start-2 row-start-1">
              <h1 className="text-3xl md:text-4xl lg:text-4xl font-roboto text-teal-800 text-start">
                Sign Up
              </h1>
            </div>
            {/* name input */}
            <div className="col-span-8 col-start-2 col-end-8 row-start-3">
              <p className="text-start text-teal-800 font-light">name</p>
              <input
                className="p-5 outline-noneborder  border-amber-100 h-10 w-full rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                placeholder="abc"
                type="text"
                value="Able K Saju"
                {...register("name")}
              />
              <p className="text-red-600 text-xs text-start">
                {errors && errors.name && <p>{errors.name.message}</p>}
              </p>
            </div>

            {/* email input */}
            <div className="col-span-8 col-start-2 col-end-8 row-start-4">
              <p className="text-start text-teal-800 font-light">email</p>
              <input
                className="p-5 outline-none border border-amber-100 h-10 w-full rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                placeholder="abc@gmai.com"
                type="text"
                value="ableksaju3@gmail.com"
                {...register("email")}
              />
              <p className="text-red-600 text-xs text-start">
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
                value="1234"
                {...register("password")}
              />
              <p className="text-red-600 text-xs text-start">
                {errors && errors.password && <p>{errors.password.message}</p>}
              </p>
            </div>

            {/* submit */}
            <div className="col-span-8 col-start-2 col-end-8 row-start-6">
              <button
                type="submit"
                className="py-2 px-3 flex justify-center items-center bg-teal-800 hover:bg-teal-600 focus:ring-teal-900 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg max-w-md"
              >
                Sign Up
              </button>
            </div>
            <div className="col-span-4 col-start-3 row-start-7 p-2">
              <p className="text-teal-800 font-light">or continue with</p>
            </div>
            <button onClick={handleGoogle} className="col-start-3 row-start-9">
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
            <div className="col-span-4 col-start-3 row-start-10">
              <p className="text-teal-800 font-light">
                have an account ?{" "}
                <span className="text-bold text-black text-bold hover:underline">
                  <Link to="/login">Log In</Link>
                </span>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
