
import axios from "axios";
import { GetHighlightData_Api } from "../../../endpoints/common";

export const GetHighlightData = () => {
  try {
    return axios.create({ withCredentials: true }).get(GetHighlightData_Api);
  } catch (error) {
    return error;
  }
};