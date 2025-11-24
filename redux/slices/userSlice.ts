import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  username: "",
  email: "",
  bio: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.bio = action.payload.bio;
    },
    signOut: (state) => {
      state.name = "";
      state.username = "";
      state.email = "";
      state.bio = "";
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
