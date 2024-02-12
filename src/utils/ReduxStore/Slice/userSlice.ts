import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:{},
    },
    reducers:{
        addUser:(state,action)=>{
            console.log(action.payload,"PAYLOAD");
            
            state.userData = {...state.userData,...action.payload}
       },
       clearUser:(state)=>{
           state.userData={}
       },
       editUser:(state,action)=>{
        state.userData = {...state.userData,...action.payload}
       },
       addProfileImage:(state,action)=>{
        console.log(action,"ACTIONN");
        state.userData = {...state.userData,...action.payload}
       },
       getUser:()=>{},
       updateUser:()=>{}
    }
})

export const {addUser,clearUser,editUser,getUser,updateUser,addProfileImage} =userSlice.actions

export default userSlice.reducer;