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
       getUser:()=>{},
       updateUser:()=>{}
    }
})

export const {addUser,clearUser,getUser,updateUser} =userSlice.actions

export default userSlice.reducer;