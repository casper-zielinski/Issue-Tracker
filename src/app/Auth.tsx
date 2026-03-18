"use client";

import { useDispatch } from "react-redux";
import { signIn, signOut, User } from "../../redux/slices/userSlice";
import { AppDispatch } from "../../redux/store";
import { signUp } from "../../redux/slices/logSlice";
import { useCallback, useEffect } from "react";

interface AuthProps {
  user: User | null;
  children: React.ReactNode;
}

const Auth = ({ user, children }: AuthProps) => {
  const dispatch: AppDispatch = useDispatch();

  const fetchIssues = useCallback(() => {
    if (!user || !user.id) {
      dispatch(signOut());
    } else {
      dispatch(signIn(user));
      dispatch(signUp());
    }
  }, [dispatch, user]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  return <>{children}</>;
};

export default Auth;
