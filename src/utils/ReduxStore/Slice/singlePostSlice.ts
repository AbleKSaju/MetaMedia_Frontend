import { createSlice } from "@reduxjs/toolkit";


const singlePost = createSlice({
  name: "singlePost",
  initialState: {
    singlePost: {},
    postUserData:{},
    isSinglePostModal: false
  },
  reducers: {
    addPostData: (state: any, action: any) => {
      if (action.payload) {
        return { ...state, singlePost: action.payload };
      }
    },
    clearPostData: (state: any) => {
       
        state.singlePost = {};
    },
    isSinglePostModalOpen:(state:any)=>{
        state.isSinglePostModal=true      
    },
    isSinglePostModalClose:(state:any)=>{
        state.isSinglePostModal=false
    },
    setPostUserData:(state:any,action:any)=>{
        if (action.payload) {
            return { ...state, postUserData: action.payload };
          }
    },
    clearPostUserData:(state:any)=>{
        state.postUserData={}
    }

  },
});

export const { addPostData, clearPostData ,isSinglePostModalOpen,isSinglePostModalClose,setPostUserData,clearPostUserData } = singlePost.actions;
export default singlePost.reducer;
