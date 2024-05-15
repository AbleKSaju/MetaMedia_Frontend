import { AddComent_Api } from "../../../endpoints/common";
import { axiosInstance } from "../../../../costumHook/constumHook";

export const AddCommentFunction = async (data: any) => {
  try {
    const response = await axiosInstance.post(AddComent_Api, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
