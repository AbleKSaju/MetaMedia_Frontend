import { createSlice} from '@reduxjs/toolkit'

    const tokenSlice=createSlice({
        name:"token",
        initialState:{
            token:""
        },
        reducers:{
            addToken:(state,action)=>{
                state.token=action.payload
            },
            clearToken:(state)=>{
                state.token=""
            }
        }
    })

    export const { addToken,clearToken} = tokenSlice.actions

    export default tokenSlice.reducer 