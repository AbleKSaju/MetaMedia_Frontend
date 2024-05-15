import { showAllPost_Api } from "../../../endpoints/common";
import { axiosInstance } from "../../../../costumHook/constumHook";
export const showAllPostFuntion = async () => {
  try {
    const response = await axiosInstance.get(`${showAllPost_Api}`);
    return response.data;
  } catch (error) {
    console.log("Error fro the sow all post get file", error);
  }
};
