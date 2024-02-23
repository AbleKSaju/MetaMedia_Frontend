import axios from 'axios'
import { ReportPost_Api} from '../../../endpoints/common'



export const ReportPostFunction = async(data:any) => {
  try {
    
    
    const response=await axios.create({ withCredentials: true }).post(ReportPost_Api,data);
    return response.data
  } catch (error) {
    return error;
  }
};
