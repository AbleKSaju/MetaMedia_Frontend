import axios from "axios";
import { GetAllStories_Api, GetStories_Api } from "../../../endpoints/common";

export const getStoriesFunction = () => {
  try {
    return axios.create({ withCredentials: true }).get(GetStories_Api);
  } catch (error) {
    return error;
  }
};

export const getAllStoriesFunction = () => {
  try {
    return axios.create({ withCredentials: true }).get(GetAllStories_Api);
  } catch (error) {
    return error;
  }
};

