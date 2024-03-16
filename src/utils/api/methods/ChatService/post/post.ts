import axios from "axios";
import { CreateConversation_Api, CreateNewGroup_Api, SendMessage_Api } from "../../../endpoints/common";

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



export const CreateNewGroupFuntion=async(data:any)=>{
  try {
    
   const responce=await axios.create({ withCredentials: true ,headers: {'Content-Type': 'multipart/form-data'}}).post(CreateNewGroup_Api,data);
   return responce.data 


  } catch (error) {
     return error
  }

}