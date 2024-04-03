import axios from "axios";

import { GetAllUsers_Api, GetAllUsersData_Api, GetSearchUserData_Api ,Suggetion_Api} from "../../endpoints/common";
import axiosInstance from "../../../../utils/costumHook/constumHook";




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


export const getAllUsersDataFunction = async () => {
    try {
      const response = await axios
        .create({ withCredentials: true })
        .get(GetAllUsersData_Api);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  export const GetSearchUserDataFunction = async (user:string) => {
    try {
      const response = await axiosInstance
        .get(`${GetSearchUserData_Api}/${user}`);
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

