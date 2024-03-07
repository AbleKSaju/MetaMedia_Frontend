import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import userSlice from "./userSlice";


interface StoryState {
    messageData: any[];
}
const initialState: StoryState = {
    messageData: [],
};
const messageSlice = createSlice({
    name:"story",
    initialState,
    reducers: {
        addCurrentReciever: (state, action: PayloadAction<any>) => {
            state.messageData=[]
            state.messageData.push(action.payload);
        },
        deleteCurrentReciever: (state)=>{
            state.messageData = []
        },
    }
})

export const {addCurrentReciever,deleteCurrentReciever} = messageSlice.actions
export default messageSlice.reducer