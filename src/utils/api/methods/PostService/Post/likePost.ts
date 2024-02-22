import axios from 'axios'
import { likePost_Api} from '../../../endpoints/common'



export const LikePostFuntion = async(data:any) => {
  try {
    const response=await axios.create({ withCredentials: true }).post(likePost_Api,data);
    return response.data
  } catch (error) {
    return error;
  }
};
