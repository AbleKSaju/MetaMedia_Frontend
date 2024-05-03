import {
  AddProfileFormData,
  useAddProfleValidate,
} from "../../utils/formValidation/AddProfileFormData";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AddProfileFunction } from "../../utils/api/methods";
import { useDispatch, useSelector } from "react-redux";
import { ResponseData } from "../../utils/interface/userInterface";
import { editUser } from "../../utils/ReduxStore/Slice/userSlice";
// import React from "react";

const AddProfile = () => {
  const userData = useSelector((state: any) => state.persisted.user.userData);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { errors, handleSubmit, register } = useAddProfleValidate();
  const formSubmit = async (Data: AddProfileFormData) => {
    const response: any = await AddProfileFunction({ ...Data });
    if (response?.data?.status) {
      const data: ResponseData = {
        gender: response?.data?.user?.gender,
        phoneNumber: response?.data?.user?.phoneNumber,
        interests: response?.data?.user?.interests,
        dateOfBirth: response?.data?.user?.dateOfBirth,
        userName: response?.data?.user?.userName,
        bio: response?.data?.user?.bio,
      };
      dispatch(editUser(data));
      Navigate("/");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className=" bg-white sm:h-screen overflow-hidden align-middle ">
      <p className="text-2xl md:text-4xl text-center font-roboto py-7">
        Customize Your Profile
      </p>
      <div className="relative flex justify-center md:items-center">
        <div className="relative bg-[#EBE9EF]  shadow-xl overflow-hidden flex justify-center ring-1 w-full lg:w-[70vw] h-[86vh] md:h-[80vh] ring-gray-900/5 rounded-3xl sm:w-full sm:rounded-xl sm:px-10">
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="w-full h-full"
          >
            <div className=" flex flex-col mt-10 sm:mt-0">
              <div className="w-full h-full hidden sm:flex justify-center">
                <div className="w-20 h-20 md:w-28 md:h-28 flex justify-center mt-5 rounded-full overflow-hidden">
                  <img
                    src={
                      userData.profile?.startsWith(
                        "https://graph.facebook.com/"
                      )
                        ? `${userData.profile}`
                        : userData.profile
                        ? `http://localhost:3000/profile/${userData.profile}`
                        : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                    }
                    alt="Your Image"
                    className="w-20 h-20 md:w-28 md:h-28  rounded-full overflow-hidden border-2 border-black inset-0"
                  />
                </div>
              </div>
              <div className="flex flex-wrap w-full h-full md:gap-7 mt-1 justify-between lg:ml-8 lg:pr-20">
                <div className="w-full md:w-80 md:gap-5 h-20 flex flex-col items-center">
                  <div className="w-72 flex flex-col items-center justify-center">
                    <p className="self-start font-light">username</p>
                    <input
                      className="w-full h-10 pl-2 focus:outline-[#C1506D] rounded-lg"
                      placeholder="abc"
                      type="text"
                      {...register("username")}
                    />
                    <p className="text-red-600 self-start">
                      {errors && errors.username && (
                        <p>{errors.username.message}</p>
                      )}
                    </p>
                  </div>
                </div>
                <div className="w-full  md:w-80 md:gap-5 h-20 flex flex-col items-center">
                  <div className="w-72 flex flex-col items-center justify-center">
                    <p className="self-start font-light">mobile</p>
                    <input
                      className="w-full h-10 pl-2 focus:outline-[#C1506D] rounded-lg"
                      placeholder="1234567890"
                      type="number"
                      {...register("mobile")}
                    />
                    <p className="text-red-600 self-start">
                      {errors && errors.mobile && (
                        <p>{errors.mobile.message}</p>
                      )}
                    </p>
                  </div>
                </div>
                <div className="w-full  md:w-80 md:gap-5 h-20 flex flex-col items-center ">
                  <div className="w-72 flex flex-col items-center justify-center">
                    <p className="self-start font-light">dob</p>
                    <input
                      className="w-full h-10 pl-2 focus:outline-[#C1506D] rounded-lg"
                      type="date"
                      {...register("dob")}
                    />
                    <p className="text-red-600 self-start">
                      {errors && errors.dob && <p>{errors.dob.message}</p>}
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-80 h-24 flex flex-col items-center">
                  <div className="w-72 flex flex-col items-center justify-center">
                    <p className="self-start font-light">bio</p>
                    <textarea
                      className="pl-2 outline-none focus:outline-[#C1506D] h-14 border w-full md:w-70 lg:w-72 border-amber-150 md:h-36 rounded-md "
                      typeof="text"
                      placeholder="abcd"
                      defaultValue={""}
                      {...register("bio")}
                    />
                    <p className="text-red-600 self-start">
                      {errors && errors.bio && <p>{errors.bio.message}</p>}
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-80 md:gap-5 h-20 flex flex-col items-center">
                  <div className="w-72 flex flex-col items-center justify-center">
                    <p className="self-start font-light">location</p>
                    <input
                      className="w-full h-10 pl-2 focus:outline-[#C1506D] rounded-lg"
                      placeholder="Location"
                      type="text"
                      {...register("location")}
                    />
                    <p className="text-red-600 self-start">
                      {errors && errors.location && (
                        <p>{errors.location.message}</p>
                      )}
                    </p>
                  </div>
                </div>
                <div className=" flex justify-center md:flex-col gap-10 md:gap-0 w-full ml-5 ">
                  <div className="">
                    <input
                      type="radio"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      value="male"
                    />{" "}
                    &nbsp;
                    <label htmlFor="" className="">
                      male
                    </label>{" "}
                    &nbsp;
                  </div>
                  <div className="">
                    <input
                      type="radio"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      value="female"
                    />
                    &nbsp;
                    <label htmlFor="" className="">
                      female
                    </label>
                    &nbsp;
                  </div>
                  <p className="text-red-600 hidden self-start md:flex flex-col w-full">
                    {errors && errors.gender && <p>Gender is required</p>}
                  </p>
                </div>
                  <p className="text-red-600 self-start md:hidden flex flex-col items-center w-full">
                    {errors && errors.gender && <p>Gender is required</p>}
                  </p>
              </div>
            </div>

            <div className="flex justify-center mt-2 mb-2 h-full">
              <button
                type="submit"
                className=" md:mt-4 text-white h-9 bg-[#C1506D] hover:bg-[#d44e70] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:text-white focus:outline-none "
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
