import axios from "axios";
import { UserData } from "../../interface/userInterface";
import {Login_Api,SignUp_Api,VerifyOtp_Api,LoginWithGoogle_Api,AddProfile_Api,ForgotPassword_Api,ChangePassword_Api,LoginWithFacebook_Api, ChooseInterest_Api} from "../endpoints/common";

export const LoginFuntion = async (data: any) => {
  try {
    return axios.create({ withCredentials: true }).post(Login_Api, data);
  } catch (error) {
    return error;
  }
};
export const SignUpFunction = async (data: any) => {
  try {
    return axios.create({ withCredentials: true }).post(SignUp_Api, data);
  } catch (error) {
    return error;
  }
};

export const verifyOtpFunction = async (data: any) => {
  try {
    return axios.create({ withCredentials: true }).post(VerifyOtp_Api, data);
  } catch (error) {
    return error;
  }
};

export const LoginWithGoogle = async (data: UserData) => {
  try {
    return axios
      .create({ withCredentials: true }).post(LoginWithGoogle_Api, data);
  } catch (error) {
    console.log(error,"err");
  }
};

export const LoginWithFacebook = async (data: UserData) => {
  try {
    return axios
      .create({ withCredentials: true }).post(LoginWithFacebook_Api, data);
  } catch (error) {
    console.log(error,"err");
  }
};

export const AddProfileFunction = async (data: any) => {
  try {
    return axios.create({ withCredentials: true }).post(AddProfile_Api, data);
  } catch (error) {
    console.log(error,"err");
    
  }
};
export const ForgotPasswordFunction = async (data: any) => {
  try {
    return axios.create({ withCredentials: true }).post(ForgotPassword_Api, data);
  } catch (error) {
    console.log(error,"err");
  }
};
export const ChangePasswordFunction = async (data: any) => {
  try {
    return axios.create({ withCredentials: true }).post(ChangePassword_Api, data);
  } catch (error) {
    console.log(error,"err");
  }
};

export const ChooseInterestFunction=(data:any)=>{
  try {
    console.log(data,"dtaaa");
    return axios.create({withCredentials:true}).post(ChooseInterest_Api, data)
  } catch (error) {
    return error
  }
}