import axios from "axios";
import { AddHighlight_Api, AddStory_Api, DeleteStory_Api } from "../../endpoints/common";

export const addHighlightFunction = (data: any) => {
  try {
    return axios.create({ withCredentials: true }).post(AddHighlight_Api, data);
  } catch (error) {
    return error;
  }
};

export const AddStoryFunction = async (data: { image: FormData, caption: string }) => {
  try {
    // Append caption to FormData
    data.image.append('caption', data.caption);

    const response = await axios.post(AddStory_Api, data.image, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding profile image:", error);
    throw error;
  }
}

export const deleteStoryFunction = async (data:{})=>{
  try {
    return axios.create({ withCredentials: true }).post(DeleteStory_Api, data);
  } catch (error) {
    return error;
  }
}
