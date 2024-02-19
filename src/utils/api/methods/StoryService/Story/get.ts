import axios from "axios";
import { GetStories_Api } from "../../../endpoints/common";

export const getStoriesFunction = () => {
  try {
    return axios.create({ withCredentials: true }).get(GetStories_Api);
  } catch (error) {
    return error;
  }
};

