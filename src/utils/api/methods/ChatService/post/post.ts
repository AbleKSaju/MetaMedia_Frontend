import axios from "axios";
import { BlockAndUnblockUser_Api, CreateConversation_Api, SendMessage_Api } from "../../../endpoints/common";

export const sendMessageFunction = (data:any) => {
  try {
    return axios.create({ withCredentials: true }).post(SendMessage_Api,data);
  } catch (error) {
    return error;
  }
};

export const CreateConversationFunction = (data:any) => {
  try {
    return axios.create({ withCredentials: true }).post(CreateConversation_Api,data);
  } catch (error) {
    return error;
  }
};

export const BlockAndUnblockUserFunction = (data:any) => {
  try {
    return axios.create({ withCredentials: true }).post(BlockAndUnblockUser_Api,data);
  } catch (error) {
    return error;
  }
};