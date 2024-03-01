import axios from "axios";
import { GetAllUsers_Api } from "../../endpoints/common";

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