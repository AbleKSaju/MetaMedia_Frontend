import axios from 'axios'
import { UpdateComment_Api} from '../../../endpoints/common'



export const UpdateCommentFuntion = async(data:any) => {
  try {
    
    
    const response=await axios.create({ withCredentials: true }).post(UpdateComment_Api,data);
    return response.data
  } catch (error) {
    return error;
  }
};
