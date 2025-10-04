"use client";

import React, { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Save,
  RotateCcw,
  LogIn,
  UserPlus,
} from "lucide-react";
import GradientOrbs from "../GradientOrbs";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import ProfileTab from "./ProfileTab";

/**
 * SettingsPage Component
 *
 * Comprehensive user settings interface with tabbed navigation.
 * Features include:
 * - Authentication system with separate login/signup modals
 * - Profile management (name, email, username, job title, bio)
 * - Notification preferences with toggle switches
 * - Appearance settings (theme, language, auto-save)
 * - Security settings (password management, 2FA)
 * - Data management (export/import, account deletion)
 * - Responsive design with gradient orb animations
 */
const SettingsPage = () => {
  // Tab navigation state
  const [activeTab, setActiveTab] = useState("profile");

  // Settings state management
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
  });
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [autoSave, setAutoSave] = useState(true);

  // UI state management
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSave = () => {
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    setNotifications({ email: true, push: false, weekly: true });
    setTheme("dark");
    setLanguage("en");
    setAutoSave(true);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "security", label: "Security", icon: Shield },
    { id: "data", label: "Data", icon: Database },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900/20 via-black to-gray-900/20 p-3">
      <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="col-span-12 text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Settings className="w-10 h-10 text-sky-400" />
            Settings
          </h1>
          <p className="text-gray-300 text-lg">
            Manage your account and application preferences
          </p>
        </div>

        {/* Authentication Section */}
        {!isLoggedIn && (
          <div className="col-span-12 flex justify-center mb-6">
            <div className="bg-gray-900 rounded-lg p-6 text-center max-w-md">
              <h3 className="text-xl font-bold text-white mb-2">
                Access Your Account
              </h3>
              <p className="text-gray-400 mb-4">
                Sign in or create an account to manage your settings
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  className="btn btn-primary flex items-center gap-2"
                  onClick={() => setShowLoginModal(true)}
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
                <button
                  className="btn btn-outline btn-primary flex items-center gap-2"
                  onClick={() => setShowSignupModal(true)}
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {showSaveSuccess && (
          <div className="col-span-12 flex justify-center">
            <div role="alert" className="alert alert-success w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Settings saved successfully!</span>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="col-span-12 md:col-span-3">
          <div className="bg-gray-900 rounded-lg p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? "bg-sky-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="col-span-12 md:col-span-9">
          <div className="bg-gray-900 rounded-lg p-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <ProfileTab closeLoginOrSignUpTab={setIsLoggedIn} />
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Notification Preferences
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">
                        Email Notifications
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Receive issue updates via email
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={notifications.email}
                      onChange={(e) =>
                        setNotifications((prev) => ({
                          ...prev,
                          email: e.target.checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">
                        Push Notifications
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Get real-time notifications in browser
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={notifications.push}
                      onChange={(e) =>
                        setNotifications((prev) => ({
                          ...prev,
                          push: e.target.checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Weekly Summary</h3>
                      <p className="text-gray-400 text-sm">
                        Weekly digest of your issue activity
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={notifications.weekly}
                      onChange={(e) =>
                        setNotifications((prev) => ({
                          ...prev,
                          weekly: e.target.checked,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Appearance Settings
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Theme</label>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Language</label>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="en">English</option>
                      <option value="de">Deutsch</option>
                      <option value="fr">Français</option>
                      <option value="es">Español</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Auto-save</h3>
                      <p className="text-gray-400 text-sm">
                        Automatically save form inputs
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={autoSave}
                      onChange={(e) => setAutoSave(e.target.checked)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Security Settings
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="input input-bordered w-full max-w-md"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="input input-bordered w-full max-w-md"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="input input-bordered w-full max-w-md"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button className="btn btn-warning btn-md">
                    Update Password
                  </button>

                  <div className="divider"></div>

                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h3 className="text-white font-medium mb-2">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <button className="btn btn-outline btn-primary">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Data Tab */}
            {activeTab === "data" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Data Management
                </h2>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h3 className="text-white font-medium mb-2">Export Data</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Download all your issues and data
                    </p>
                    <button className="btn btn-info">Export JSON</button>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h3 className="text-white font-medium mb-2">Import Data</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Import issues from another system
                    </p>
                    <input
                      type="file"
                      className="file-input file-input-bordered w-full max-w-xs"
                    />
                  </div>

                  <div className="divider"></div>

                  <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <h3 className="text-red-400 font-medium mb-2">
                      Danger Zone
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Permanently delete your account and all data
                    </p>
                    <button className="btn btn-error">Delete Account</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="col-span-12 flex justify-center gap-4 mt-6">
          <button
            className="btn btn-primary btn-xs md:btn-lg flex items-center gap-2"
            onClick={handleSave}
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
          <button
            className="btn btn-neutral btn-xs md:btn-lg flex items-center gap-2"
            onClick={handleReset}
          >
            <RotateCcw className="w-5 h-5" />
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Gradient Orbs */}
      <GradientOrbs classname="top-16 left-8 w-32 h-32 -z-10" />
      <GradientOrbs classname="bottom-16 right-8 w-48 h-48 -z-10" />
      <GradientOrbs classname="top-1/2 left-1/4 w-24 h-24 -z-10" />

      {/* Demo Button to toggle login state */}
      {isLoggedIn && (
        <div className="fixed bottom-8 md:bottom-16 right-4">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setIsLoggedIn(false)}
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => setIsLoggedIn(true)}
      />

      {/* Signup Modal */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSignup={() => setIsLoggedIn(true)}
      />
    </div>
  );
};

export default SettingsPage;
