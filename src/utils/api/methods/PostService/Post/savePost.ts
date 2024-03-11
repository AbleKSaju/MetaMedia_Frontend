import axios from 'axios'
import { SavePost_api} from '../../../endpoints/common'



export const SavePostFunction = async(data:any) => {
  try {
    
    
    const response=await axios.create({ withCredentials: true }).post(SavePost_api,data);
    return response.data
  } catch (error) {
    return error;
  }
};
