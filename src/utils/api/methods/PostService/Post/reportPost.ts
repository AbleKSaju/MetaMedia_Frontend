import { ReportPost_Api } from "../../../endpoints/common";
import { axiosInstance } from "../../../../costumHook/constumHook";

export const ReportPostFunction = async (data: any) => {
  try {
    const response = await axiosInstance.post(ReportPost_Api, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
