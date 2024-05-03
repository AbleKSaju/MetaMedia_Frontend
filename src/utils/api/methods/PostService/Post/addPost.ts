import axios from "axios";
import { AddPost_Api } from "../../../endpoints/common";
import { axiosFormDataInstance } from "../../../../../utils/costumHook/constumHook";

export const AddPostFuntion = async (data: any) => {
  try {
    const formData = new FormData();
    const {userId,description,likes,comments,media,location,postCropSize,postType,reports,shareCount,showComment,showLikes,tags}: any = data.data;

    formData.append("userId", userId);
    formData.append("description", description);
    formData.append("likes", likes);
    formData.append("comments", comments);
    if (postType == "image") {
      media.forEach((file: any) => {
        formData.append(`images`, file);
      });
    } else {
      formData.append(`images`, media);
    }

    formData.append("location", location);
    formData.append("postCropSize", postCropSize);
    formData.append("postType", postType);
    formData.append("reports", reports);
    formData.append("shareCount", shareCount);
    formData.append("showComment", showComment);
    formData.append("showLikes", showLikes);
    formData.append("tags", tags);

    const response = await axiosFormDataInstance.post(AddPost_Api, formData);
    return response.data;
  } catch (err) {
    return err;
  }
};
