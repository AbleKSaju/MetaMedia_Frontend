import axios from "axios";
import {
  GetAllGroupsOfUser_Api,
  GetConversations_Api,
  GetMessages_Api,
  getGroupMessages_Api,
  GetGroupData_Api,
  GetNotificationOfUser_Api,
} from "../../../endpoints/common";
import { toast } from "sonner";
import { axiosInstance } from "../../../../costumHook/constumHook";

export const GetConversationsFunction = () => {
  try {
    return axiosInstance.get(GetConversations_Api);
  } catch (error) {
    return error;
  }
};

export const getMessagesFunction = (data: any) => {
  let convId = data?.conversationId ? data?.conversationId : "new";
  try {
    return axiosInstance.get(
      `${GetMessages_Api}/${convId}?receiverId=${data.receiverId}`
    );
  } catch (error) {
    return error;
  }
};

export const GetAllGroupsOfuser = async (userId: any) => {
  try {
    const response = await axiosInstance.get(
      `${GetAllGroupsOfUser_Api}?id=${userId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetGroupMessagesFunction = async (groupId: any) => {
  try {
    const response = await axiosInstance.get(
      `${getGroupMessages_Api}?groupId=${groupId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetGroupDataByIdFunction = async (groupId: any) => {
  try {
    const response = await axiosInstance.get(
      `${GetGroupData_Api}?groupId=${groupId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetNotificationOfUserFunction = async (userId: any) => {
  try {
    const response = await axiosInstance.get(
      `${GetNotificationOfUser_Api}?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
