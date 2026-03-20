import { supabaseClientSide } from "@/lib/supabase/supabase";
import { AppDispatch } from "../../../redux/store";
import {
  signIn,
  signOut as signOutSlice,
} from "../../../redux/slices/userSlice";
import { logOut, signUp } from "../../../redux/slices/logSlice";

/**
 * to sign out the user
 * @param dispatch to set Global Redux State
 */
export const signOut = async (dispatch: AppDispatch) => {
  dispatch(logOut());
  dispatch(signOutSlice());
  await supabaseClientSide.auth.signOut();
};

/**
 * To log the User In
 * @param email User Email
 * @param password User Password
 * @param dispatch to set the Global Redux State
 */
export const logIn = async (
  email: string,
  password: string,
  dispatch: AppDispatch,
) => {
  const { data, error } = await supabaseClientSide.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw error;
  }

  dispatch(
    signIn({
      username: data.user?.email?.split(".")[0],
      email: data.user?.email,
    }),
  );
  dispatch(signUp());
};

export const signInUser = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  fullName: string,
  dispatch: AppDispatch,
) => {
  if (!email || !password || !fullName || !username) {
    throw Error("Empty fields");
  }

  if (password !== confirmPassword) {
    throw Error("Incorrect Password");
  }

  if (password.length < 6) {
    throw Error("Password length minimum 6 Letters");
  }

  const { error } = await supabaseClientSide.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: fullName,
        username: username,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    throw Error("Internal Server Error");
  }

  dispatch(
    signIn({
      name: fullName,
      username: username,
      email: email,
      bio: "",
    }),
  );
  dispatch(signUp());
};

export interface EditableUserData {
  username?: string;
  job_title?: string;
  bio?: string;
}

export const editData = async (editData: EditableUserData) => {
  await supabaseClientSide.from("profiles").upsert({ editData });
  if (editData.username) {
    await supabaseClientSide.auth.updateUser({
      data: { username: editData.username },
    });
  }
};
