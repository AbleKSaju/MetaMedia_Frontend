
import axios from "axios";
import { GetHighlightData_Api } from "../../../endpoints/common";

export const GetHighlightData = (userId:string) => {
  try {
    return axios.create({ withCredentials: true }).get(`${GetHighlightData_Api}/${userId}`);
  } catch (error) {
    return error;
  }
};