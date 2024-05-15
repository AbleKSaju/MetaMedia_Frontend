import { AddHighlight_Api, AddStory_Api, AddVideos_Api, DeleteStory_Api, getMyAllStoriesForHighLightList_Api } from "../../../endpoints/common";
import {axiosFormDataInstance, axiosInstance} from "../../../../costumHook/constumHook";

export const addHighlightFunction = (data: any) => {
  try {
    return axiosInstance.post(AddHighlight_Api, data);
  } catch (error) {
    return error;
  }
};

export const AddStoryFunction = async (data: { image: FormData, caption: string ,profile: string}) => {
  try {
    // Append caption to FormData
    data.image.append('caption', data.caption);
    data.image.append('profile', data.profile);

    const response = await axiosFormDataInstance.post(AddStory_Api, data.image)
    return response.data;
  } catch (error) {
    console.error("Error adding profile image:", error);
    throw error;
  }
}

export const deleteStoryFunction = async (data:{})=>{
  try {
    return axiosInstance.post(DeleteStory_Api, data);
  } catch (error) {
    return error;
  }
}

export const getMyAllStoriesForHighLightListFunction = async ()=>{
  try {
    return axiosInstance.get(getMyAllStoriesForHighLightList_Api);
  } catch (error) {
    return error;
  }
}
export const AddVideoToStoryFunction = async (data:any)=>{
  try {
    return axiosInstance.post(AddVideos_Api,data);
  } catch (error) {
    return error;
  }
}