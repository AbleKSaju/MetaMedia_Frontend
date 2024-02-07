import axios from "axios";
import { AddHighlight_Api } from "../../endpoints/common";

export const addHighlightFunction = (data: any) => {
  try {
    return axios.create({ withCredentials: true }).post(AddHighlight_Api, data);
  } catch (error) {
    return error;
  }
};
