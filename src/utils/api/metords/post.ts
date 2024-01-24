import axios from 'axios'
import {UserData} from '../../interface/userInterface'
import {Login_Api,SignUp_Api, VerifyOtp_Api,LoginWithGoogle_Api} from '../endpoints/common'


export const LoginFuntion=async(data:any)=>{
    try {
        console.log("ENNNT");
        return axios.create({withCredentials:true}).post(Login_Api,data)
    } catch (error) {
        return error
    }
}
export const SignUpFunction= async(data:any)=>{
    try {
        console.log("CALLING SIGN UP");
        return axios.create({withCredentials:true}).post(SignUp_Api,data)
    } catch (error) {
        return error
    }
}

export const verifyOtpFunction=async(data:any)=>{
    try {
        return axios.create({withCredentials:true}).post(VerifyOtp_Api,data)
    } catch (error) {
        return error
    }
}

export const LoginWithGoogle=async(data:UserData)=>{

 try {
    return axios.create({withCredentials:true}).post(LoginWithGoogle_Api,data)
 } catch (error) {
    
 }   
}