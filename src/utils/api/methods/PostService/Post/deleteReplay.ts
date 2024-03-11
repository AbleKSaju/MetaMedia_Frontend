import axios from 'axios'
import { DeleteReplay_Api} from '../../../endpoints/common'



export const DeleteReplayFunction = async(data:any) => {
  try {
    const response=await axios.create({ withCredentials: true }).post(DeleteReplay_Api,data);
    return response.data
  } catch (error) {
    return error;
  }
};
