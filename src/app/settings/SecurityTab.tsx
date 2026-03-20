"use client";

import React from "react";

/**
 * SecurityTab Component
 *
 * Manages user security settings including:
 * - Password change functionality
 * - Two-factor authentication (2FA) setup
 */
const SecurityTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Security Settings</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Current Password</label>
          <input
            type="password"
            className="input input-bordered w-full max-w-md bg-zinc-900"
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">New Password</label>
          <input
            type="password"
            className="input input-bordered w-full max-w-md bg-zinc-900"
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            className="input input-bordered w-full max-w-md bg-zinc-900"
            placeholder="Confirm new password"
          />
        </div>

        <button className="btn btn-warning btn-md">Update Password</button>

        <div className="divider"></div>

        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-white font-medium mb-2">
            Two-Factor Authentication
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Add an extra layer of security to your account
          </p>
          <button className="btn btn-outline btn-primary">Enable 2FA</button>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
