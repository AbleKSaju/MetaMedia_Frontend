import mongoose from "mongoose";

export interface UserData {
    profile: string;
    email: string;
    name: string;
    isGoogle: boolean;
    isFacebook: boolean;
  }

 export interface ResponseData {

    email?: string;
    name?: string; 
    userName?:string;
    bio?:string
    phoneNumber?:string;
    interests?: string[]; 
    gender?:string;
    dateOfBirth?:string;
    location?:string;
    userId?:mongoose.Schema.Types.ObjectId;
    profile?:string,
    isGoogle?:boolean,
    isFacebook?:boolean
  }

