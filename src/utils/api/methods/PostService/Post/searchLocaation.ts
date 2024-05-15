import { SearchLocation_Api } from "../../../endpoints/common";
import { axiosInstance } from "../../../../costumHook/constumHook";
export const searchLocationFuntion = async (data: string) => {
  const bakendData = {
    data: data,
  };

  const response = await axiosInstance.post(SearchLocation_Api, bakendData);

  return response.data;
};
