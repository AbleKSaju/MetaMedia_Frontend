import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StoryState {
    highlightData: any[];
}
const initialState: StoryState = {
    highlightData: [],
};
const highlightSlice = createSlice({
    name:"highlight",
    initialState,
    reducers: {
        addHighlights: (state, action: PayloadAction<any>) => {
            console.log(action.payload, "PAYLOAD");
            state.highlightData=[]
            state.highlightData = action.payload;
        }
    }
})

export const {addHighlights} = highlightSlice.actions
export default highlightSlice.reducer