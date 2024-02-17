import axios from "axios";
import { AddNewHighlight_Api } from "../../../endpoints/common";

export const addNewHighlightFunction = (data: any) => {
  try {
    return axios.create({ withCredentials: true }).post(AddNewHighlight_Api, data);
  } catch (error) {
    return error;
  }
};
