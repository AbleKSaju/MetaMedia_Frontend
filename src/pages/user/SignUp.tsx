import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { SignUpFunction } from "../../utils/api/metords/post";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  RegisterFormData,
  useRegisterValidate,
} from "../../utils/formValidation/SignUpValidation";
import { ErrorComponent } from "../../components/ErrorComponents/ErrorComponent";
import { FieldErrors } from "react-hook-form";

const SignUp = () => {

  const Navigate = useNavigate();
  const responseMessage: any = (response: any) => {
    const decode: any = jwtDecode(response.credential);
    console.log(decode);
  };
  const errorMessage: any = (error: any) => {
    console.log(error);
  };

  const { errors, handleSubmit, register } = useRegisterValidate();

  const formSubmit = async (Data: RegisterFormData) => {
    const response: any = await SignUpFunction({ ...Data });
    if (response?.data?.status) {
      toast.success("Register success");
      Navigate("/verifyOtp");
    }
    toast.error(response?.data?.message);
  };


  return (
    <>
      <div className="relative flex justify-center align-middle bg-gray-50 mt-10">


        {/* wrapper div  */}
        <div className="relative bg-amber-50 px-6 pt-10 pb-16 shadow-xl flex justify-center ring-1 w-[70vw] h-[85vh] mt-6 ring-gray-900/5 sm:mx-auto rounded-3xl sm:max-w-lg sm:rounded-xl sm:px-10">
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
                {...register("name")}
              />
              <p className="text-red-600">
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
                {...register("email")}
              />
              <p className="text-red-600">
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
              <p className="text-red-600">
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
            <button className="col-start-2 ml-4 row-start-9">
              {
                <div>
                  {" "}
                  <GoogleLogin
                    onSuccess={responseMessage}
                    onError={errorMessage}
                    useOneTap
                  />{" "}
                </div>
              }
            </button>
            <button
              type="button"
              // onClick={handleMainButtonClick}
              className="col-start-6 row-start-9"
            >
              <img src="/fonts/facebook.png" alt="G" />
            </button>
            {/* {condition && (
            <FacebookLoginButton
              onLoginSuccess={handleLoginSuccess}
              onLoginFailure={handleLoginFailure}
            />
          )} */}

            {/* Create account */}
            <div className="col-span-4 col-start-3 row-start-10">
              <p className="text-teal-800 font-light">
                have an account ?{" "}
                <span className="text-bold text-black text-bold">Log in</span>{" "}
              </p>
            </div>
          </form>

        </div>
      </div>
    </>
  );
};

export default SignUp;
