import { GetLikedAndComentedPost_Api } from "../../../endpoints/common";
import { axiosInstance } from "../../../../costumHook/constumHook";
export const GetLikedAndComentedPostFunction = (userId: any) => {
  try {
    return axiosInstance.get(`${GetLikedAndComentedPost_Api}?id=${userId}`);
  } catch (error) {
    return error;
  }
};
