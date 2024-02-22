import axios from 'axios'
import { AddComent_Api} from '../../../endpoints/common'



export const AddCommentFunction = async(data:any) => {
  try {
    console.log(data,'this is data');
    
    const response=await axios.create({ withCredentials: true }).post(AddComent_Api,data);
    return response.data
  } catch (error) {
    return error;
  }
};
