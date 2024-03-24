import { createSlice } from "@reduxjs/toolkit";


const adminSlice=createSlice({
    name:"admin",
    initialState:{
        adminData:{},
    },
    reducers:{
       addAdminData:(state,action)=>{
        state.adminData = {...state.adminData,...action.payload}
       },
       clearAdmin:(state)=>{
           state.adminData={}
       }
    }
})

export const {addAdminData,clearAdmin} =adminSlice.actions

export default adminSlice.reducer;