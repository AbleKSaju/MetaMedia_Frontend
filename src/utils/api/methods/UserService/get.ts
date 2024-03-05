import axios from "axios";
import { GetAllUsers_Api, GetAllUsersData_Api, GetSearchUserData_Api } from "../../endpoints/common";

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
      const response = await axios
        .create({ withCredentials: true })
        .get(`${GetSearchUserData_Api}/${user}`);
      return response.data;
    } catch (error) {
      return error;
    }
  };