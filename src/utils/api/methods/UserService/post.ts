import axios from "axios";
import {
  AddProfileImage_Api,
  AddProfile_Api,
  ChooseInterest_Api,
  EditProfile_Api,
  GetUserData_Api,
  GetUsersData_Api,
  getUsersByName_Api,
  getuserById_Api,
} from "../../endpoints/common";

export const EditProfileFunction = (data: any) => {
  try {
    return axios.create({ withCredentials: true }).post(EditProfile_Api, data);
  } catch (error) {
    return error;
  }
};

export const AddProfileFunction = async (data: any) => {
  try {
    return axios.create({ withCredentials: true }).post(AddProfile_Api, data);
  } catch (error) {
    console.log(error, "err");
  }
};

export const addProfileImageFunction = async (formData: FormData) => {
  try {
    const response = await axios.post(AddProfileImage_Api, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding profile image:", error);
    throw error;
  }
};

export const ChooseInterestFunction = (data: any) => {
  try {
    console.log(data, "dtaaa");
    return axios
      .create({ withCredentials: true })
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
    const response = await axios
      .create({ withCredentials: true })
      .post(getUsersByName_Api, body);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserByIdFuntion = async (data: any) => {
  try {
    const datas = { id: data };
    console.log(datas,"datasdatasdatas");
    
    const response = await axios
      .create({ withCredentials: true })
      .post(getuserById_Api, datas);
    return response.data;
  } catch (error) {
    console.log("Eroor froom getUserByIdFuntion", error);
    return error;
  }
};
export const GetUsersDataByIdFunction = async (data: any) => {
  try {
    return axios.create({ withCredentials: true }).post(GetUsersData_Api, data);
  } catch (error) {
    console.log(error,"err");
  }
};
