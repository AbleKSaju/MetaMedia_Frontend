import {
  ChangePasswordFormData,
  useChangePasswordValidation,
} from "../../utils/formValidation/ChangePasswordValidation";
import { ChangePasswordFunction } from "../../utils/api/methods/AuthService/post";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const Navigate = useNavigate();
  const { errors, handleSubmit, register } = useChangePasswordValidation();
  const formSubmit = async (Data: ChangePasswordFormData) => {
    const response: any = await ChangePasswordFunction({ ...Data });
    console.log(response, "resss");
    if (response.status) {
      toast.success(response?.data?.message);
      Navigate("/login");
    } else {
      toast.error(response?.data?.message);
    }
  };
  return (
    <div className="relative flex justify-center md:items-center align-middle overflow-hidden bg-gray-50 sm:h-[100vh]">
      <div className="relative bg-amber-50 px-6 pt-10 pb-8 shadow-xl overflow-hidden flex justify-center ring-1 w-[100vw] h-[100vh] md:h-[80vh] ring-gray-900/5 rounded-3xl sm:max-w-lg sm:rounded-xl sm:px-10">
        <form
          className="grid grid-cols-8 grid-rows-14 gap-3 text-center"
          onSubmit={handleSubmit(formSubmit)}
        >
          <div className="col-span-8 col-start-2 col-end-8 row-start-3">
            <h1 className="text-2xl sm:text-4xl lg:text-4xl font-roboto text-teal-800 text-start">
              Change Password
            </h1>
          </div>
          <div className="col-span-8 col-start-2 col-end-8 row-start-5">
            <p className="text-start text-teal-800 font-light">new password</p>
            <input
              className="p-5 outline-none border border-amber-100 h-10 w-full rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
              placeholder="abc@gmai.com"
              type="text"
              {...register("password")}
            />
            <p className="text-red-600 text-xs text-start">
              {errors && errors.password && <p>{errors.password.message}</p>}
            </p>
          </div>
          <div className="col-span-8 col-start-2 col-end-8 row-start-6 ">
            <p className="text-start text-teal-800 font-light">
              confirm password
            </p>
            <input
              className=" p-5 outline-none border border-amber-100 h-10 w-full rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
              placeholder="********"
              type="text"
              {...register("confirmpassword")}
            />
            <p className="text-red-600 text-xs text-start">
              {errors && errors.confirmpassword && (
                <p>{errors.confirmpassword.message}</p>
              )}
            </p>
            <p />
          </div>
          <div className="col-span-8 col-start-3 col-end-7 row-start-7">
            <button
              type="submit"
              className="py-2 px-3 flex justify-center items-center bg-teal-800 hover:bg-teal-600 focus:ring-teal-900 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg max-w-md"
            >
              Confirm
            </button>
          </div>
          <div className="col-span-4 col-start-3 row-start-10">
            <p className="text-teal-800 font-light">
              have an account?
              <span className="text-bold text-black text-bold"> Log in</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
