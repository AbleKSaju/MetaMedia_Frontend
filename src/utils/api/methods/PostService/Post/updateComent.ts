import { UpdateComment_Api} from '../../../endpoints/common'
import { axiosInstance } from '../../../../../utils/costumHook/constumHook';

export const UpdateCommentFuntion = async(data:any) => {
  try {
    const response=await axiosInstance.post(UpdateComment_Api,data);
    return response.data
  } catch (error) {
    return error;
  }
};
