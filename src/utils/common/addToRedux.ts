import { useDispatch } from "react-redux";
import { ResponseData } from "../interface/userInterface";
import { addUser, clearUser } from "../ReduxStore/Slice/userSlice";
import { LoginWithFacebook } from "../api/methods/AuthService/post";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


export const addToRedux = async (data: any) => {
    const dispatch = useDispatch()
    // const Navigate = useNavigate()
    const userData={
        profile:data.user.photoURL,
        email:data.user.email,
        name:data.user.displayName,
         isGoogle:false,
         isFacebook:true
    }  
    const response:any = await LoginWithFacebook(userData)
    if (response?.data?.status && response?.data?.data?.profile?.interests?.length < 2) {
      const data: ResponseData = {
        email: response.data.data.basicInformation.email,
        name: response.data.data.basicInformation.fullName,
        userId: response.data.data._id,
        profile: response.data.data.profile.profileUrl,
        isGoogle: response.data.data.basicInformation.isGoogle,
        isFacebook: response.data.data.basicInformation.isFacebook,
      };
      console.log(data,"dataaa");
      dispatch(clearUser());
      dispatch(addUser(data));
      return {status:true , message:response?.data?.message, path:"/chooseinterest"}
    //   if (data) {
    //     toast.success(response?.data?.message);
    //     Navigate("/chooseinterest");
    //   }
    } else if (response?.data?.status) {
      const data: ResponseData = {
        email: response.data.data.basicInformation.email,
        name: response.data.data.basicInformation.fullName,
        userId: response.data.data._id,
        profile: response.data.data.profile.profileUrl,
        isGoogle: response.data.data.basicInformation.isGoogle,
        isFacebook: response.data.data.basicInformation.isFacebook,
      };
      console.log(data,"dataaa");
      dispatch(clearUser());
      dispatch(addUser(data));
      return {status:true , message:response?.data?.message, path:"/"}
    //   if (data) {
    //     toast.success(response?.data?.message);
    //     Navigate('/')
    //   }
    } else {
      toast.error(response?.data?.message)
    }
};
