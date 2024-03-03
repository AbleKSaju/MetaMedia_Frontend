import axios from 'axios'
import { DeletePost_Api} from '../../../endpoints/common'



export const DeletePostFuntion = async(data:any) => {
  try {
    const response=await axios.create({ withCredentials: true }).post(DeletePost_Api,data);
    return response.data
  } catch (error) {
    return error;
  }
};
