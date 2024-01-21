import React from "react";

const SignUp = () => {
  console.log("Enter");

  return (
    <div className="relative flex min-h-screen justify-center align-middle overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative bg-amber-50 px-6 pt-10 pb-8 shadow-xl flex justify-center ring-1 w-[70vw] h-[80vh] mt-6 ring-gray-900/5 sm:mx-auto rounded-3xl sm:max-w-lg sm:rounded-xl sm:px-10">
        <div className="grid grid-cols-8 grid-rows-14 gap-3 text-center">
          <div className="col-span-4 col-start-1 row-start-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-black-600 text-start">
              Sign Up
            </h1>
          </div>
          <div className="col-span-8 col-start-1 row-start-3">
            <p className="text-start">name</p>
            <input
              name="name"
              className="border border-amber-100 h-10 w-full rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
              placeholder="  abc"
              type="text"
            />
          </div>
          <div className="col-span-8 col-start-1 row-start-4">
            <p className="text-start">email</p>
            <input
              name="email"
              className="border border-amber-100 h-10 w-full rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
              placeholder="  abc@gmai.com"
              type="text"
            />
          </div>
          <div className="col-span-8 col-start-1 row-start-5 ">
            <p className="text-start">Password</p>
            <input
              name="email"
              className="border border-amber-100 h-10 w-full rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
              placeholder="  ****"
              type="text"
              />
              <p className="text-end">forgot password?</p>
          </div>
          <div className="col-span-8 col-start-1 row-start-6">
            <button className="w-full h-10 text-white rounded-lg bg-teal-800">Sign Up</button>
          </div>
          <div className="col-span-4 col-start-3 row-start-7 p-2">
          <p>or continue with</p>
          </div>
          <div className="col-start-3 row-start-9 p-2">
            <img src="/fonts/google.png" alt="" />
          </div>
          <div className="col-start-6 row-start-9 p-2">
            <img src="/fonts/facebook.png" alt="" />
          </div>
          <div className="col-span-8 col-start-1 row-start-10 p-2 bg-amber-200">
            9
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;



{/* <div class="grid grid-cols-5 grid-rows-7 gap-4">
        <div class="col-span-3 col-start-2">2</div>
    <div class="col-span-3 col-start-2 row-start-2">3</div>
    <div class="col-span-3 col-start-2 row-start-3">4</div>
    <div class="col-span-3 col-start-2 row-start-4">5</div>
    <div class="col-span-3 col-start-2 row-start-5">6</div>
    <div class="col-span-3 col-start-2 row-start-6">7</div>
</div>
     */}