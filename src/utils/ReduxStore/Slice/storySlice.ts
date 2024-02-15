import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import userSlice from "./userSlice";


interface StoryState {
    storyData: any[]; // Adjust the type according to your data structure
}
const initialState: StoryState = {
    storyData: [],
};
const storySlice = createSlice({
    name:"story",
    initialState,
    reducers: {
        addStory: (state, action: PayloadAction<any>) => {
            console.log(action.payload, "PAYLOAD");
            state.storyData=[]
            state.storyData.push(action.payload);
        },
        deleteStory: (state, action:PayloadAction<number>)=>{
            const indexToDelete = action.payload;
            console.log(indexToDelete, "Index to delete");
            console.log(state,"state.");
            console.log(state.storyData,"state.storyData.");
            console.log(state.storyData[0],"state.storyData.[0[]]");
            
            state.storyData = state.storyData.filter((_,index) => index !== indexToDelete);
        }
    }
})

export const {addStory,deleteStory} = storySlice.actions
export default storySlice.reducer