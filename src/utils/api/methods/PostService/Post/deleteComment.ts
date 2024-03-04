import axios from 'axios'
import { DeleteComment_Api} from '../../../endpoints/common'



export const DeleteCommentFuntion = async(data:any) => {
  try {
    const response=await axios.create({ withCredentials: true }).post(DeleteComment_Api,data);
    return response.data
  } catch (error) {
    return error;
  }
};
