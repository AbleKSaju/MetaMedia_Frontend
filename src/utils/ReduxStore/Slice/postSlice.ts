import { createSlice } from "@reduxjs/toolkit";
const postSlice=createSlice({
    name:'post',
    initialState :{
        imageUrl:"",
        imageSize:""
    },
    reducers:{
        addImageUrl:(state:any,action:any)=>{
            if (action.payload) {
                return { ...state, imageUrl: action.payload };
              }
        },
        clearImageUrl:(state:any,action:any)=>{
            state.imageUrl=""
        },
        addImageSize:(state:any,action:any)=>{
            if (action.payload) {
                return { ...state, imageSize: action.payload };
              }
        },
        cleareImageSize:(state:any,action:any)=>{
                state.imageSize=""
        }
    }
})