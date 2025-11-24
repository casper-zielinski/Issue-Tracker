"use client";

import { supabase } from "@/lib/supabase";
import React, { useEffect } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/slices/userSlice";
import { logOut, signUp } from "../../redux/slices/logSlice";

interface AuthProps {
  children: React.ReactNode;
}

const Auth = ({ children }: AuthProps) => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || user.email === "") {
        dispatch(logOut());
      } else {
        dispatch(
          signIn({
            username: user?.email?.split(".")[0],
            email: user?.email,
            id: user?.id,
          })
        );
        dispatch(signUp());
      }
    };
    getUser();
  }, [dispatch]);
  return <>{children}</>;
};

export default Auth;
