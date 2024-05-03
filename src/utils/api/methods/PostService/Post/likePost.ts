import { likePost_Api} from '../../../endpoints/common'
import { axiosInstance } from '../../../../../utils/costumHook/constumHook';

export const LikePostFuntion = async(data:any) => {
  try {
    const response=await axiosInstance.post(likePost_Api,data);
    return response.data
  } catch (error) {
    return error;
  }
};
