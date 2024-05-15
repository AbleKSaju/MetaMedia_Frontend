import { ChangePostStatus_Api, ChangeUserStatus_Api } from "../../endpoints/common";
import { axiosInstance } from "../../../costumHook/constumHook";

export const ChangeUserStatusFunction = async (data:any) => {
  try {
    return axiosInstance.post(ChangeUserStatus_Api, data);
  } catch (error) {
    return error;
  }
};
export const ChangePostStatusFunction = async (data:any) => {
  try {
    return axiosInstance.post(ChangePostStatus_Api, data);
  } catch (error) {
    return error;
  }
};