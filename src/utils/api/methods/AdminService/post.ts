import axios from "axios";
import { ChangeUserStatus_Api } from "../../endpoints/common";


export const ChangeUserStatusFunction = async (userId:string) => {
  try {
    return axios.create({ withCredentials: true }).post(ChangeUserStatus_Api, userId);
  } catch (error) {
    return error;
  }
};