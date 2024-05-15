import { ReplayToComment_Api } from "../../../endpoints/common";
import { axiosInstance } from "../../../../costumHook/constumHook";

export const AddReplayToCommentFunction = async (data: any) => {
  try {
    const response = await axiosInstance.post(ReplayToComment_Api, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
