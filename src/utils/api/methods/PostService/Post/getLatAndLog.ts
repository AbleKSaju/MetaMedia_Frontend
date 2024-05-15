import { getLatAndLong_Api } from "../../../endpoints/common";
import { axiosInstance } from "../../../../costumHook/constumHook";

export const getLatAndLogFuntion = async (data: string) => {
  const bakendData = { id: data };
  const response = await axiosInstance.post(getLatAndLong_Api, bakendData);

  return response.data;
};
