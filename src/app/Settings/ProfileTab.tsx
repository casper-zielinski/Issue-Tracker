import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";

interface User {
  email: string;
  id: string;
}

interface ProfileTabProps {
  closeLoginOrSignUpTab: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileTab = ({ closeLoginOrSignUpTab }: ProfileTabProps) => {
  const [userInfo, SetUser] = useState<User>({
    email: "",
    id: "",
  });

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      SetUser({
        email: user.email || "",
        id: user.id,
      });
      closeLoginOrSignUpTab(true);
    }

    
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Profile Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="John Doe"
            defaultValue="John Doe"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="john@example.com"
            defaultValue={userInfo.email}
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Username</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="johndoe"
            defaultValue="johndoe"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Job Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Software Developer"
            defaultValue="Software Developer"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Bio</label>
        <textarea
          className="textarea textarea-bordered w-full h-24"
          placeholder="Tell us about yourself..."
          defaultValue="Passionate developer with expertise in web technologies."
        ></textarea>
      </div>
    </div>
  );
};

export default ProfileTab;
