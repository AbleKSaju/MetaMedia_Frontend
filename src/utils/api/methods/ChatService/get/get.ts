import axios from "axios";
import { GetConversations_Api, GetMessages_Api } from "../../../endpoints/common";


export const GetConversationsFunction = () => {
  try {
    return axios.create({ withCredentials: true }).get(GetConversations_Api);
  } catch (error) {
    return error;
  }
};

export const getMessagesFunction = (data:any) => {
    console.log(data,"ddaaatttaaa");
    
  try {
    return axios.create({ withCredentials: true }).get(`${GetMessages_Api}/${data.conversationId}?receiverId=${data.receiverId}`);
  } catch (error) {
    return error;
  }
};
