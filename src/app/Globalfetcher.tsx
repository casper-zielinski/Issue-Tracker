"use server";

import prisma from "@db/client";
import AuthProvider from "./Auth";
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

  // do not call you own API's in Server Components if you can just use backend logic here
  const issues = await prisma.issue.findMany();

  return <AuthProvider issues={issues} user={user} />;
};

export default Globalfetcher;
