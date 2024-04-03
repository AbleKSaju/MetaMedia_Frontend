import {   RefreshToken_Api } from "../../endpoints/common";
import axios from "axios";
export const Refresh = () => {
  try {
    return axios.create({ withCredentials: true }).post(RefreshToken_Api);
  } catch (error) {
    return error;
  }
};
