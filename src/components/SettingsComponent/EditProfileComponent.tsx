import { toast } from "sonner";
import {
  useEditProfleValidate,
  EditProfileFormData,
} from "../../utils/formValidation/EditProfleValidation";
import { EditProfileFunction } from "../../utils/api/methods/UserService/post";

const EditProfile = () => {
  const { errors, handleSubmit, register } = useEditProfleValidate();

  const formSubmit = async (Data: EditProfileFormData) => {
    const response: any = await EditProfileFunction({ ...Data });
    console.log(response, "ressseeee");
    if (response?.data?.status) {
      toast.success(response.data.message);
      // Navigate('/')
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)} className="flex-col sm:flex">
        <div className="lg:flex lg:gap-x-20">
          <div className="mt-20 lg:mt-14 flex flex-col">
            <label htmlFor="full_name" className="mb-2">
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
          <div className="mt-8 lg:mt-14 flex flex-col">
            <label htmlFor="user_name" className="mb-2">
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
          <div className="mt-8 lg:mt-14 flex flex-col">
            <label htmlFor="mobile" className="mb-2">
              mobile
            </label>
            <input
              id="mobile"
              className="h-10 w-72 lg:w-64 outline-none xl:w-72  border border-teal-900 rounded-lg focus:border-2 px-2"
              type="text"
              {...register("mobile")}
            />
            <p className="text-red-600">
              {errors && errors.mobile && <p>{errors.mobile.message}</p>}
            </p>
          </div>
          <div className="mt-8 lg:mt-14 flex flex-col">
            <label htmlFor="gender" className="mb-2">
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
        <div className="mt-8 lg:mt-14 flex flex-col">
          <label htmlFor="description">description</label>
          <textarea
            id="description"
            className="h-32 w-full border outline-none border-teal-900 rounded-lg mt-2 focus:border-2 px-2"
            typeof="text"
            {...register("bio")}
          />
          <p className="text-red-600">
            {errors && errors.bio && <p>{errors.bio.message}</p>}
          </p>
        </div>
        <div className="mt-10 flex justify-center ">
          <button className="h-12 lg:mt-10 w-52 hover:shadow-lg transition duration-300 ease-in-out hover:bg-teal-700 hover:text-amber-100 focus:outline-none focus:ring focus:border-teal-800 bg-teal-900 text-amber-50 font-bold  rounded-lg text-xl">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
