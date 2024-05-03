import axios from "axios";
import { AddNewHighlight_Api, DeleteHighlight_Api } from "../../../endpoints/common";
import { axiosInstance } from "../../../../../utils/costumHook/constumHook";

export const addNewHighlightFunction = (data: any) => {
  try {
    return axiosInstance.post(AddNewHighlight_Api, data);
  } catch (error) {
    return error;
  }
};

export const DeleteHighlightFunction = (data: any) => {
  try {
    return axiosInstance.post(DeleteHighlight_Api, data);
  } catch (error) {
    return error;
  }
};

