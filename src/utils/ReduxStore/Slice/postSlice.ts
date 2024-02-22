import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        images: [],
        videos: [],
        aspectRatio: null // Stores the selected aspect ratio for cropping
    },
    reducers: {
        addImage: (state:any, action:any):any => {
            if (action.payload) {
              
                console.log(action.payload,"HHHHHH");
                
                state.images.push(action.payload);
            }
        },
        removeImage: (state:any, action:any) => {
            state.images = state.images.filter((image :any) => image !== action.payload);
        },
        clearImages: (state:any) => {
            state.images = [];
        },
        addVideo: (state:any, action:any) => {
            if (action.payload) {
                state.videos.push(action.payload);
            }
        },
        removeVideo: (state:any, action:any) => {
            state.videos = state.videos.filter((video :any) => video !== action.payload);
        },
        clearVideos: (state:any) => {
            state.videos = [];
        },
        setAspectRatio: (state, action) => {
            state.aspectRatio = action.payload;
        },
        clearAspectRatio:(state:any)=>{
            state.aspectRatio=null
        }

    }
});

export const { addImage, removeImage, clearImages, addVideo, removeVideo, clearVideos, setAspectRatio ,clearAspectRatio} = postSlice.actions;
export default postSlice.reducer;
