import { DeleteReplay_Api } from "../../../endpoints/common";
import { axiosInstance } from "../../../../costumHook/constumHook";

export const DeleteReplayFunction = async (data: any) => {
  try {
    const response = await axiosInstance.post(DeleteReplay_Api, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
