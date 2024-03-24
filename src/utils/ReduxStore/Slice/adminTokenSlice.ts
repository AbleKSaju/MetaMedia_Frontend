import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "adminToken",
  initialState: {
    adminToken: "",
  },
  reducers: {
    addAdminToken: (state: any, action: any) => {
      if (action.payload) {
        return { ...state, token: action.payload };
      }
    },
    clearAdminToken: (state: any) => {
        state.token = "";
    },
  },
});

export const { addAdminToken, clearAdminToken } = tokenSlice.actions;
export default tokenSlice.reducer;
