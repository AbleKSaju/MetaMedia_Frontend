import { createSlice } from "@reduxjs/toolkit";

const liveSlice = createSlice({
    name: 'live',
    initialState: {
       liveName:'',
       liveUser:[],
       liveId:  ''
    },
    reducers: {
        addLiveName: (state:any, action:any):any => {
            if (action.payload) {
                state.liveName=action.payload
            }
        },
        clearLiveName:(state:any)=>{
            state.liveName=''
        },
        addLiveUser:(state:any,action:any)=>{
            state.liveUser.push(action.payload)
        },
        clearLiveUsers:(state:any)=>{
            state.liveUser=[]
        },
        setLiveId:(state:any, action:any):any => {
            if (action.payload) {
                state.liveId=action.payload
            }
        },
        clearLiveId:(state:any)=>{
           state.liveId=''
        }
        

    }
});

export const { addLiveName, clearLiveName, addLiveUser, clearLiveUsers,setLiveId,clearLiveId} = liveSlice.actions;
export default liveSlice.reducer;
