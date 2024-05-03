import axios from "axios";
import {
  AddProfileImage_Api,
  AddProfile_Api,
  ChooseInterest_Api,
  EditProfile_Api,
  FollowUser_Api,
  GenarateVapIdKeys_Api,
  GetUsersData_Api,
  SubcribeUserToSNS_Api,
  getUsersByName_Api,
  getuserById_Api,
} from "../../endpoints/common";
import {axiosFormDataInstance, axiosInstance} from "../../../../utils/costumHook/constumHook";

export const EditProfileFunction = (data: any) => {
  try {
    return axiosInstance.post(EditProfile_Api, data);
  } catch (error) {
    return error;
  }
};

export const AddProfileFunction = async (data: any) => {
  try {
    return axiosInstance.post(AddProfile_Api, data);
  } catch (error) {
    console.log(error, "err");
  }
};

export const addProfileImageFunction = async (formData: FormData) => {
  try {
    const response = await axiosFormDataInstance.post(AddProfileImage_Api, formData)
    return response.data;
  } catch (error) {
    console.error("Error adding profile image:", error);
    throw error;
  }
};

export const ChooseInterestFunction = (data: any) => {
  try {
    return axiosInstance
      .post(ChooseInterest_Api, data);
  } catch (error) {
    return error;
  }
};

export const getUsersByNameFunction = async (data: string) => {
  try {
    const body = {
      name: data,
    };
    const response = await axiosInstance
      .post(getUsersByName_Api, body);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserByIdFuntion = async (data: any) => {
  try {
    const datas = { id: data };    
    const response = await axiosInstance
      .post(getuserById_Api, datas);
    return response.data;
  } catch (error) {
    console.log("Eroor froom getUserByIdFuntion", error);
    return error;
  }
};

export const GetUsersDataByIdFunction = async (data: any) => {
  try {
    return axiosInstance.post(GetUsersData_Api, data);
  } catch (error) {
    console.log(error,"err");
  }
};

export const followUserFunction = async (data: any) => {
  try {
    return axiosInstance.post(FollowUser_Api, data);
  } catch (error) {
    console.log(error,"err");
  }
};

export const GenarateVapIdKeysFunction = async (data:any) => {
  try {
    const response = await axiosInstance
      .post(`${GenarateVapIdKeys_Api}`,data);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const SubcribeUserToSNSFunction = async (data:any) => {
  try {
    const response = await axiosInstance
      .post(`${SubcribeUserToSNS_Api}`,data);

    return response.data;
  } catch (error) {
    return error;
  }
};