import axios from "axios";
import { ChangePostStatus_Api, ChangeUserStatus_Api } from "../../endpoints/common";

export const ChangeUserStatusFunction = async (data:any) => {
  try {
    return axios.create({ withCredentials: true }).post(ChangeUserStatus_Api, data);
  } catch (error) {
    return error;
  }
};
export const ChangePostStatusFunction = async (data:any) => {
  try {
    return axios.create({ withCredentials: true }).post(ChangePostStatus_Api, data);
  } catch (error) {
    return error;
  }
};