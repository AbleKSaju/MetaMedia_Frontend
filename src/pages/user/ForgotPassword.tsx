import React from "react";

const ForgotPassword = () => {
  return (
    <>
      <div className="relative flex justify-center align-middle overflow-hidden bg-gray-50 m-0 sm:py-12">
        <div className="relative bg-amber-50 px-6 pt-10 pb-8 shadow-xl overflow-hidden flex justify-center ring-1 w-[100vw] h-[100vh] md:h-[80vh] ring-gray-900/5 rounded-3xl sm:max-w-lg sm:rounded-xl sm:px-10">
          <form
            className=" grid grid-cols-5 grid-rows-9 gap-8"
          >
            <div className="col-span-7  col-start-1 row-start-2 bg-red-30  text-teal-800 text-3xl">
              <h1 className="font-roboto text-4xl lg:text-5xl">
                Forgot Password
              </h1>
            </div>
            <div className="row-span-2 col-span-6 col-start-1 row-start-4 text-teal-800 ">
              Enter Your Email
              <input
                className="p-5 outline-noneborder mt-4  border-teal-800 h-10 w-full rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                placeholder="abc@gmail.com"
                type="text"
              />
            </div>
            <div className="col-start-3 row-start-6">
              <button
                type="button"
                className="focus:outline-none text-amber-50  bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-teal-800 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Submit
              </button>
            </div>
            <div className="col-start-2 ml-10 row-start-7 w-52 text-teal-800 ">
              create new account?
            </div>
            <div className="col-start-4 row-start-9 w-32 text-teal-800">
              Back to Login
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
