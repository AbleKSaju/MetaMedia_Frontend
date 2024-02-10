import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:{},
    },
    reducers:{
        addUser:(state,action)=>{
            state.userData = {...state.userData,...action.payload}
       },
       clearUser:(state)=>{
           state.userData={}
       },
       editUser:(state,action)=>{
        console.log("Enter to ACTION");
        console.log(state.userData,"ALREADy");
        console.log(action,"actt");
        
        state.userData = {...state.userData,...action.payload}
       },
       getUser:()=>{},
       updateUser:()=>{}
    }
})

export const {addUser,clearUser,editUser,getUser,updateUser} =userSlice.actions

export default userSlice.reducer;