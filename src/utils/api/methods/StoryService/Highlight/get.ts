
import axios from "axios";
import { GetHighlightData_Api } from "../../../endpoints/common";
import { axiosInstance } from "../../../../../utils/costumHook/constumHook";

export const GetHighlightData = (userId:string) => {
  try {
    return axiosInstance.get(`${GetHighlightData_Api}/${userId}`);
  } catch (error) {
    return error;
  }
};