import axios from "axios";
import {GetUserDataById_Api} from '../../endpoints/common'

export const GetUserDataByIdFunction=async (userId:string) => {
    try {
      const response = await axios
        .create({ withCredentials: true })
        .get(`/${GetUserDataById_Api}?userId=${userId}`);
      return response.data;
    } catch (error) {
      return error;
    }
  };