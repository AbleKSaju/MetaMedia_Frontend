import axios from "axios";
import { AddNewHighlight_Api, DeleteHighlight_Api } from "../../../endpoints/common";

export const addNewHighlightFunction = (data: any) => {
  try {
    return axios.create({ withCredentials: true }).post(AddNewHighlight_Api, data);
  } catch (error) {
    return error;
  }
};

export const DeleteHighlightFunction = (data: any) => {
  try {
    return axios.create({ withCredentials: true }).post(DeleteHighlight_Api, data);
  } catch (error) {
    return error;
  }
};

