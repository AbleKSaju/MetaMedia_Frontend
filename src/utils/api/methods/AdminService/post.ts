import axios from "axios";
import { ChangeUserStatus_Api } from "../../endpoints/common";


export const ChangeUserStatusFunction = async (data:any) => {
  try {
    return axios.create({ withCredentials: true }).post(ChangeUserStatus_Api, data);
  } catch (error) {
    return error;
  }
};