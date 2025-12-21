"use server";

import AuthProvider from "./Auth";
import axios from "axios";
import { createClient } from "@/lib/supabase/server";

const Globalfetcher = async () => {
  const supabase = await createClient();

  const userResponse = await supabase.auth.getUser();
  const user = {
    id: userResponse?.data.user?.id ?? "",
    name: userResponse?.data.user?.user_metadata.full_name ?? "",
    username: userResponse?.data.user?.email?.split(".")[0] ?? "",
    email: userResponse?.data.user?.email ?? "",
    bio: "",
  };

  const issueResponse = await axios.get(`${process.env.API_URL}/api/issues`);
  const issues = issueResponse.data;

  return <AuthProvider issues={issues} user={user} />;
};

export default Globalfetcher;
