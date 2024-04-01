import { PayloadAction, createSlice } from "@reduxjs/toolkit"



interface StoryState {
    storyData: any[];
    otherUsersStoryData: any[]
}
const initialState: StoryState = {
    storyData: [],
    otherUsersStoryData: [],
};
const storySlice = createSlice({
    name:"story",
    initialState,
    reducers: {
        addStory: (state, action: PayloadAction<any>) => {
            state.storyData=[]
            state.storyData.push(action.payload);
        },
        deleteStory: (state, action:PayloadAction<number>)=>{
            const indexToDelete = action.payload;
            state.storyData = state.storyData.filter((_,index) => index !== indexToDelete);
        },
        deleteAllStory: (state)=>{
            state.storyData=[]
        },
        addOtherUserStories: (state, action: PayloadAction<any>)=>{
            state.otherUsersStoryData=[]
            state.otherUsersStoryData.push(action.payload);

        }
    }
})

export const {addStory,deleteStory,deleteAllStory,addOtherUserStories} = storySlice.actions
export default storySlice.reducer