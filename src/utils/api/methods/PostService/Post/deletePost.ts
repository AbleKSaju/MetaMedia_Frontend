import { DeletePost_Api } from "../../../endpoints/common";
import { axiosInstance } from "../../../../costumHook/constumHook";

export const DeletePostFuntion = async (data: any) => {
  try {
    const response = await axiosInstance.post(DeletePost_Api, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
