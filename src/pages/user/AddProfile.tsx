import { ChangeEvent, useState } from "react";
import {
  AddProfileFormData,
  useAddProfleValidate,
} from "../../utils/formValidation/AddProfileFormData";
import { AddProfileFunction } from "../../utils/api/methods/AuthService/post";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
// import React from "react";

const AddProfile = () => {
  const Navigate=useNavigate()
  console.log("ENter");

  const { errors, handleSubmit, register } = useAddProfleValidate();

  // const [dob, setDob] = useState("");

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   let inputValue = e.target.value.replace(/\D/g, "");
  //   if (inputValue.length <= 2) {
  //     setDob(inputValue);
  //   } else if (inputValue.length <= 4) {
  //     setDob(`${inputValue.slice(0, 2)}/${inputValue.slice(2)}`);
  //   } else {
  //     setDob(
  //       `${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}/${inputValue.slice(
  //         4,
  //         8
  //       )}`
  //     );
  //   }
  // };

  const formSubmit = async (Data: AddProfileFormData) => {
    console.log("SUBMIT");
    
    const response: any = await AddProfileFunction({ ...Data });
    console.log("getting response");
    
    console.log(response, "ressseeee");
    if(response?.data?.status){
      toast.success(response.data.message)
      Navigate('/')
    }else{
      toast.error(response.data.message)
    }
  };

  return (
    <div className="relative bg-gray-50 sm:h-screen overflow-hidden align-middle ">
      <p className="text-2xl md:text-4xl text-center font-roboto py-7">
        Customize Your Profile
      </p>
      <div className="relative flex justify-center md:items-center">
        <div className="relative bg-amber-50 shadow-xl overflow-hidden flex justify-center ring-1 w-full lg:w-[70vw] h-[85vh] md:h-[80vh] ring-gray-900/5 rounded-3xl sm:w-full sm:rounded-xl sm:px-10">
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-10 grid-rows-12 gap-5"
          >
            <div className="col-span-3 md:col-span-10 row-span-2 flex justify-center col-start-5 row-start-2">
              <div className="w-20 h-20 md:w-32 md:h-32  mb-0 rounded-full overflow-hidden">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAJ1BMVEX///8AAABZWVn4+Pi/v7+zs7OioqLp6emZmZlra2tdXV2oqKgeHh5SHkywAAABeUlEQVR4nO3dS66CQBRFURGUn/Mf78uLkZa2rEpxyrUGYO6OAcrGxcsFAAAAAAAAAPhR47RPY+sharoN/26tx6jnPjzdWw9Syzy8zK1HqWQ5CpfWo1SyHoVr61EquR6F19ajVKIwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvP1X7gdhVvrUd6Yl/X6pe1xFD62bz9sXQrvEt+H8ym6EX5rXfNWwb3+sXXLB+XezjC1TvlgKla4t075YC9W2P932P912P+99Aeehz9wpini3OfSEvr/baEwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvMpzKcwn8J8CvP1X9j/f6svR+HSepRK5qPwjDu8Rbw2wgtvYZ/Jc6+/6B792YzTPhV8EwIAAAAAAAAAkOUPN2oQMjDsn+EAAAAASUVORK5CYII="
                  alt="Your Image"
                  className="w-20 h-20 md:w-32 md:h-32  rounded-full overflow-hidden border-2 border-teal-950 inset-0"
                />
              </div>
            </div>
            <div className="col-span-full sm:col-span-2 md:col-span-5 lg:w-70 lg:ml-10 row-start-4 sm:row-start-5">
              <p className="text-start text-teal-800 font-light">username</p>
              <input
                className="p-5 outline-none border border-amber-150 h-10 sm:w-full lg:w-72 rounded-sm text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                placeholder="abc"
                type="text"
                {...register("username")}
              />
              <p className="text-red-600">
                {errors && errors.username && <p>{errors.username.message}</p>}
              </p>
            </div>
            <div className="col-span-5 lg:w-70 lg:ml-10 col-start-4 sm:col-start-1  lg:col-start-1 row-start-5 sm:row-start-7 ">
              <p className="text-start text-teal-800 font-light">mobile</p>
              <input
                className="p-5 outline-none border border-amber-150 h-10 sm:w-70 lg:w-72 rounded-sm text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                placeholder="1234567890"
                type="number"
                {...register("mobile")}
              />
              <p className="text-red-600">
                {errors && errors.mobile && <p>{errors.mobile.message}</p>}
              </p>
            </div>
            <div className="col-span-5 lg:w-70 lg:ml-10 col-start-4 sm:col-start-1  lg:col-start-1 row-start-6 sm:row-start-9 ">
              <p className="text-start text-teal-800 font-light">dob</p>
              <input
                className="p-5 outline-none border border-amber-150 h-10 sm:w-70 lg:w-72 rounded-sm text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                type="date"
                {...register("dob")}
              />
              <p className="text-red-600">
                {errors && errors.dob && <p>{errors.dob.message}</p>}
              </p>
            </div>
            <div className="col-span-5 lg:w-70 lg:mr-10 row-span-3 col-start-6 sm:col-start-6 lg:col-start-6 row-start-6 sm:row-start-5 text-start">
              <p className="text-start text-teal-800 font-light">bio</p>
              <textarea
                className="pl-2 outline-none border w-full md:w-70 lg:w-72 border-amber-150 md:h-36 rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                typeof="text"
                defaultValue={""}
                {...register("bio")}
              />
              <p className="text-red-600">
                {errors && errors.bio && <p>{errors.bio.message}</p>}
              </p>
            </div>
            <div className="col-span-full sm:col-span-2 md:col-span-5 lg:w-70 lg:mr-10 row-start-9 md:row-start-9">
              <p className="text-start text-teal-800 font-light">location</p>
              <input
                className="p-5 outline-none border w-full border-amber-150 h-10 rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                placeholder="Location"
                type="text"
                {...register("location")}
              />
              <p className="text-red-600">
                {errors && errors.location && <p>{errors.location.message}</p>}
              </p>
            </div>
            {/* <div className="ml-12 md:ml-0 lg:ml-10 col-span-full sm:col-span-2 md:col-span-5 row-start-9 md:row-start-10 mt-9">
              <input type="radio" /> &nbsp;
              <label htmlFor="" className="text-teal-800">
                male
              </label>{" "}
              &nbsp;
              <input type="radio" />
              &nbsp;
              <label htmlFor="" className="text-teal-800">
                female
              </label>
              &nbsp;
            </div> */}
            <div className="ml-12 md:ml-0 lg:ml-10 col-span-full sm:col-span-2 md:col-span-5 row-start-9 md:row-start-10 mt-9">
              <input
                type="radio"
                {...register("gender", { required: "Gender is required" })}
                value="male"
              />{" "}
              &nbsp;
              <label htmlFor="" className="text-teal-800">
                male
              </label>{" "}
              &nbsp;
              <input
                type="radio"
                {...register("gender", { required: "Gender is required" })}
                value="female"
              />
              &nbsp;
              <label htmlFor="" className="text-teal-800">
                female
              </label>
              &nbsp;
              <p className="text-red-600">
                {errors && errors.gender && <p>Gender is required</p>}
              </p>
            </div>
            <div className="col-start-9 mr- lg:col-start-8 lg:mr-8 lg:col-span-3 col-span-3 mt-24 row-start-10 flex flex-col bg-red-500 justify-end">
              <button
                type="submit"
                className="focus:outline-none text-amber-50  bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-teal-800 dark:hover:bg-teal-700 dark:focus:ring-green-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProfile;
