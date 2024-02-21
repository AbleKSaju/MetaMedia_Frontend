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
            state.highlightData=[]
            state.highlightData = action.payload;
        },
        deleteHighlights: (state) => {
            state.highlightData=[]
        }
    }
})

export const {addHighlights,deleteHighlights} = highlightSlice.actions
export default highlightSlice.reducer