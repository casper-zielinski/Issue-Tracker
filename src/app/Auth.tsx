"use client";

import { useDispatch } from "react-redux";
import { signIn, signOut, User } from "../../redux/slices/userSlice";
import { AppDispatch } from "../../redux/store";
import { Issue } from "./Dashboard/types";
import { signUp } from "../../redux/slices/logSlice";

interface AuthProps {
  user: User | null;
  issues: Issue[];
}

const Auth = ({ user, issues }: AuthProps) => {
  const dispatch: AppDispatch = useDispatch();

  if (!user || !user.id) {
    dispatch(signOut());
  } else {
    dispatch(signIn(user));
    dispatch(signUp());
  }

  return <></>;
};

export default Auth;
