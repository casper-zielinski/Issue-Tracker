import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    signOut: (state) => {
      state.username = "";
      state.email = "";
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
