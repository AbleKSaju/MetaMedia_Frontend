    import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: "",
  },
  reducers: {
    addToken: (state: any, action: any) => {
      if (action.payload) {
        return { ...state, token: action.payload };
      }
    },
    clearToken: (state: any) => {
        state.token = "";
    },
  },
});

export const { addToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
