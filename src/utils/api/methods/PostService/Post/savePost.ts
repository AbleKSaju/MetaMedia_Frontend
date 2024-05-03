import { SavePost_api} from '../../../endpoints/common'
import { axiosInstance } from '../../../../../utils/costumHook/constumHook';

export const SavePostFunction = async(data:any) => {
  try {
    const response=await axiosInstance.post(SavePost_api,data);
    return response.data
  } catch (error) {
    return error;
  }
};
