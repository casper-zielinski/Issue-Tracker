import { createSlice } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
}

const initialState = {
  id: "",
  name: "",
  username: "",
  email: "",
  bio: "",
} as User;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.bio = action.payload.bio;
    },
    signOut: (state) => {
      state.id = "";
      state.name = "";
      state.username = "";
      state.email = "";
      state.bio = "";
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
