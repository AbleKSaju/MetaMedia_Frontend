import axios from "axios";
import { EditProfile_Api } from "../../endpoints/common";

export const EditProfileFunction = (data: any) => {
    try {
      return axios.create({ withCredentials: true }).post(EditProfile_Api, data);
    } catch (error) {
      return error;
    }
  };