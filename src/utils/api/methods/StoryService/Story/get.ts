import { GetAllStories_Api, GetStories_Api } from "../../../endpoints/common";
import { axiosInstance } from "../../../../costumHook/constumHook";

export const getStoriesFunction = () => {
  try {
    return axiosInstance.get(GetStories_Api);
  } catch (error) {
    return error;
  }
};

export const getAllStoriesFunction = () => {
  try {
    return axiosInstance.get(GetAllStories_Api);
  } catch (error) {
    return error;
  }
};
