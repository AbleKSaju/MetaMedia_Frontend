import axios from "axios";
import {SelectNewCharactor_Api,CreateNewUser_Api} from '../../endpoints/common'

export const SelectNewCharactorFunction=async (data:any) => {
    try {
      const response = await axios
        .create({ withCredentials: true })
        .post(SelectNewCharactor_Api,data);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  export const CreateNewUserFunction=async(data:any)=>{
    try {
        const response = await axios
          .create({ withCredentials: true })
          .post(CreateNewUser_Api,data);
        return response.data;
      } catch (error) {
        return error;
      }
  }