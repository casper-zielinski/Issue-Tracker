"use client";

import { useDispatch } from "react-redux";
import { signIn, signOut, User } from "../../redux/slices/userSlice";
import { AppDispatch } from "../../redux/store";
import { Issue } from "./Dashboard/types";
import { signUp } from "../../redux/slices/logSlice";
import { setIssuesCache } from "../../redux/slices/issuesSlice";
import { serializeIssues } from "@/hooks/serializeIssues";
import { useCallback, useEffect } from "react";

interface AuthProps {
  user: User | null;
  issues: Issue[];
  children: React.ReactNode;
}

const Auth = ({ user, issues, children }: AuthProps) => {
  const dispatch: AppDispatch = useDispatch();

  const fetchIssues = useCallback(() => {
    dispatch(setIssuesCache({ issues: serializeIssues(issues) }));
    if (!user || !user.id) {
      dispatch(signOut());
    } else {
      dispatch(signIn(user));
      dispatch(signUp());
    }
  }, [dispatch, issues, user]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  return <>{children}</>;
};

export default Auth;
