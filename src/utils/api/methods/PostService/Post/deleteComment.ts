import axios from 'axios'
import { DeleteComment_Api} from '../../../endpoints/common'
import { axiosInstance } from '../../../../../utils/costumHook/constumHook';



export const DeleteCommentFuntion = async(data:any) => {
  try {
    const response=await axiosInstance.post(DeleteComment_Api,data);
    return response.data
  } catch (error) {
    return error;
  }
};
