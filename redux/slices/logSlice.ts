import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logedIn: false,
};

const logSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    signUp: (state) => {
      state.logedIn = true;
    },
    logOut: (state) => {
      state.logedIn = false;
    },
  },
});

export const {signUp, logOut} = logSlice.actions;

export default logSlice.reducer;
