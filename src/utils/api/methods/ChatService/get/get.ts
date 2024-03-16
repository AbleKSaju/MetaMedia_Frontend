import axios from "axios";
import { GetAllGroupsOfUser_Api, GetConversations_Api, GetMessages_Api,getGroupMessages_Api,GetGroupData_Api } from "../../../endpoints/common";


export const GetConversationsFunction = () => {
  try {
    return axios.create({ withCredentials: true }).get(GetConversations_Api);
  } catch (error) {
    return error;
  }
};

export const getMessagesFunction = (data:any) => {  
    let convId = data?.conversationId ? data?.conversationId:'new' 
  try {
    return axios.create({ withCredentials: true }).get(`${GetMessages_Api}/${convId}?receiverId=${data.receiverId}`);
  } catch (error) {
    return error;
  }
};


export const GetAllGroupsOfuser=async(userId:any)=>{
   try {
     const response=await axios.create({withCredentials:true}).get(`${GetAllGroupsOfUser_Api}?id=${userId}`)
     return response.data
   } catch (error) {
     return error
   }
}

export const GetGroupMessagesFunction=async(groupId:any)=>{
  try {
    const response=await axios.create({withCredentials:true}).get(`${getGroupMessages_Api}?groupId=${groupId}`)
    return response.data
  } catch (error) {
    return error
  }
}

export const GetGroupDataByIdFunction=async(groupId:any)=>{
  try {
    const response=await axios.create({withCredentials:true}).get(`${GetGroupData_Api}?groupId=${groupId}`)
    return response.data
  } catch (error) {
    return error
  }
}