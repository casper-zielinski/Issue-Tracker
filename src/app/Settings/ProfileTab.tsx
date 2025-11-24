import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const ProfileTab = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const userInfo = useSelector((state: RootState) => state.userState);

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Username</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="johndoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Job Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Software Developer"
            defaultValue="Software Developer"
            readOnly
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Bio</label>
        <textarea
          className="textarea textarea-bordered w-full h-24"
          placeholder="Tell us about yourself..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default ProfileTab;
