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
    userId:mongoose.Schema.Types.ObjectId;
    profile:string,
    isGoogle:boolean,
    isFacebook:boolean
  }