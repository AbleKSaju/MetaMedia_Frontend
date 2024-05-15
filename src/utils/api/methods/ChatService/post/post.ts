import axios from "axios";
import {
  CreateConversation_Api,
  BlockAndUnblockUser_Api,
  CreateNewGroup_Api,
  SendMessage_Api,
  SendGroupMessage_Api,
  SendVoiceMessge_Api,
  sendFileMessage_Api,
  SendFileForMessage_Api,
  DeleteMessage_Api,
  SendVoice_Api,
} from "../../../endpoints/common";
import {
  axiosFormDataInstance,
  axiosInstance,
} from "../../../../costumHook/constumHook";

export const sendMessageFunction = (data: any) => {
  try {
    return axiosInstance.post(SendMessage_Api, data);
  } catch (error) {
    return error;
  }
};

export const CreateConversationFunction = (data: any) => {
  try {
    return axiosInstance.post(CreateConversation_Api, data);
  } catch (error) {
    return error;
  }
};

export const CreateNewGroupFuntion = async (data: any) => {
  try {
    const responce = await axiosFormDataInstance.post(CreateNewGroup_Api, data);
    return responce.data;
  } catch (error) {
    return error;
  }
};

export const SendGroupMessageFunction = async (data: any) => {
  try {
    const responce = await axiosInstance.post(SendGroupMessage_Api, data);
    return responce.data;
  } catch (error) {
    return error;
  }
};

export const SendVoiceNoteFunction = async (data: any) => {
  try {
    const responce = await axiosFormDataInstance.post(
      SendVoiceMessge_Api,
      data
    );
    return responce.data;
  } catch (error) {
    return error;
  }
};
export const SendVoiceFunction = async (data: any) => {
  try {
    const responce = await axiosFormDataInstance.post(SendVoice_Api, data);
    return responce.data;
  } catch (error) {
    return error;
  }
};

export const SendFileMessageFunction = async (data: any) => {
  try {
    const responce = await axiosFormDataInstance.post(
      sendFileMessage_Api,
      data
    );
    return responce.data;
  } catch (error) {
    return error;
  }
};
export const BlockAndUnblockUserFunction = (data: any) => {
  try {
    return axiosInstance.post(BlockAndUnblockUser_Api, data);
  } catch (error) {
    return error;
  }
};

export const SendFileForMessageFunction = async (data: any) => {
  try {
    const responce = await axiosFormDataInstance.post(
      SendFileForMessage_Api,
      data
    );
    return responce.data;
  } catch (error) {
    return error;
  }
};

export const DeleteMessageFunction = async (messageId: string) => {
  try {
    const responce = await axiosInstance.delete(
      `${DeleteMessage_Api}/${messageId}`
    );
    return responce.data;
  } catch (error) {
    return error;
  }
};
