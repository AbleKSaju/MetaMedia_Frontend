import { toast } from "sonner";
import {
  useEditProfileValidate,
  EditProfileFormData,
} from "../../utils/formValidation/EditProfileValidation";
import { EditProfileFunction } from "../../utils/api/methods";
import { useDispatch, useSelector } from "react-redux";
import { ResponseData } from "../../utils/interface/userInterface";
import { editUser } from "../../utils/ReduxStore/Slice/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const dispatch = useDispatch();
  const Navigate=useNavigate()
  const userData = useSelector((state: any) => state.persisted.user.userData);
  console.log(userData,"userDatauserDatauserDatauserData");
  
  const { errors, handleSubmit, register } = useEditProfileValidate({
    fullname: userData?.name,
    username: userData?.userName ?? "",
    phoneNumber: userData?.phoneNumber ?? "",
    bio: userData?.bio ?? "",
    gender: userData?.gender ?? "",
  });

  // Inside your component function

  const formSubmit = async (Data: EditProfileFormData) => {
    const response: any = await EditProfileFunction({ ...Data });
    console.log(response, "ressseeee");
    if (response?.data?.status) {
      console.log(response.data.user, "usssss");

      const data: ResponseData = {
        gender: response?.data?.user?.gender,
        phoneNumber: response?.data?.user?.phoneNumber,
        name: response?.data?.user?.fullName,
        userName: response?.data?.user?.userName,
        bio: response?.data?.user?.bio,
      };
      console.log(data, "NEWDATA");

      dispatch(editUser(data));
      toast.success(response.data.message);
      Navigate(`/profile/${userData?.userId}`);  
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <div className="hidden sm:flex lg:ml-3 ustify-center w-100%">
        <form onSubmit={handleSubmit(formSubmit)} className="flex-col sm:flex">
          <h1 className="flex justify-center text-4xl font-roboto lg:mt-14 mt-6 text-teal-900">
            Edit Profile
          </h1>
          <div className="lg:flex lg:gap-x-20">
            <div className="mt-5 lg:mt-14 flex flex-col">
              <label htmlFor="full_name" className="mb-1 lg:mb-2 text-teal-900">
                full name
              </label>
              <input
                id="full_name"
                className="h-10 w-72 lg:w-64 outline-none xl:w-72  border border-teal-900 rounded-lg focus:border-2 px-2"
                type="text"
                {...register("fullname")}
              />
              <p className="text-red-600">
                {errors && errors.fullname && <p>{errors.fullname.message}</p>}
              </p>
            </div>
            <div className="mt-5 lg:mt-14 flex flex-col">
              <label htmlFor="user_name" className="mb-1 lg:mb-2 text-teal-900">
                user name
              </label>
              <input
                id="user_name"
                className="h-10 w-72 lg:w-64 outline-none xl:w-72  border border-teal-900 rounded-lg focus:border-2 px-2"
                type="text"
                {...register("username")}
              />
              <p className="text-red-600">
                {errors && errors.username && <p>{errors.username.message}</p>}
              </p>
            </div>
          </div>
          <div className="lg:flex lg:gap-x-20">
            <div className="mt-5 lg:mt-14 flex flex-col">
              <label htmlFor="phoneNumber" className="mb-1 lg:mb-2 text-teal-900">
                mobile
              </label>
              <input
                id="phoneNumber"
                className="h-10 w-72 lg:w-64 outline-none xl:w-72  border border-teal-900 rounded-lg focus:border-2 px-2"
                type="text"
                {...register("phoneNumber")}
              />
              <p className="text-red-600">
                {errors && errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
              </p>
            </div>
            <div className="mt-5 lg:mt-14 flex flex-col">
              <label htmlFor="gender" className="mb-1 lg:mb-2 text-teal-900">
                gender
              </label>
              <input
                id="gender"
                className="h-10 w-72 lg:w-64 outline-none xl:w-72  border border-teal-900 rounded-lg focus:border-2 px-2"
                type="text"
                {...register("gender")}
              />
              <p className="text-red-600">
                {errors && errors.gender && <p>{errors.gender.message}</p>}
              </p>
            </div>
          </div>
          <div className="mt-5 lg:mt-14 flex flex-col">
            <label htmlFor="description" className="text-teal-900">
              description
            </label>
            <textarea
              id="description"
              className="h-24 w-full border outline-none border-teal-900 rounded-lg mt-2 focus:border-2 px-2"
              typeof="text"
              {...register("bio")}
            />
            <p className="text-red-600">
              {errors && errors.bio && <p>{errors.bio.message}</p>}
            </p>
          </div>
          <div className="mt-5 lg:mt-20 flex justify-center ">
            <button className="h-12  w-52 hover:shadow-lg transition duration-300 ease-in-out hover:bg-[#C1506D] focus:outline-none focus:ring focus:border-teal-800 bg-[#f49db3] text-black font-md border border-black rounded-lg text-xl">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
