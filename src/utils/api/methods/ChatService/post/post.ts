import axios from "axios";
import { SendMessage_Api } from "../../../endpoints/common";


export const sendMessageFunction = (data:any) => {
  try {
    return axios.create({ withCredentials: true }).post(SendMessage_Api,data);
  } catch (error) {
    return error;
  }
};
