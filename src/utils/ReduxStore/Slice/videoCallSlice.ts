import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface StoryState {
    socketData: any;
}
const initialState: StoryState = {
    socketData: {},
};
const socketSlice = createSlice({
    name:"videoCall",
    initialState,
    reducers: {
        addSocketData: (state, action: PayloadAction<any>) => {
            state.socketData=[]
            state.socketData=action?.payload;
        },
        deleteSocketData: (state)=>{
            state.socketData = []
        },
    }
})

export const {addSocketData,deleteSocketData} = socketSlice.actions
export default socketSlice.reducer