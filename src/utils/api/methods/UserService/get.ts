import axios from "axios";
import { GetAllUsers_Api ,Suggetion_Api} from "../../endpoints/common";

export const getAllUsersFunction = async () => {
    try {
      const response = await axios
        .create({ withCredentials: true })
        .get(GetAllUsers_Api);
      return response.data;
    } catch (error) {
      return error;
    }
  };


  export const suggetionFuntion = async (userId:any) => {
    try {
      const response = await axios
        .create({ withCredentials: true })
        .get(`${Suggetion_Api}?userId=${userId}`);
      return response.data;
    } catch (error) {
      return error;
    }
  };