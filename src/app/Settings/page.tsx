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
import NotificationsTab from "./NotificationsTab";
import AppearanceTab from "./AppearanceTab";
import SecurityTab from "./SecurityTab";
import DataTab from "./DataTab";
import { signOut } from "../supabase/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";

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

  // UI state management
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const logedIn = useSelector((state: RootState) => state.logInState.logedIn);

  const handleSave = () => {
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    // Note: Reset functionality would need to be implemented within each tab component
    console.log("Reset functionality should be handled by individual tabs");
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
        {!logedIn && (
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
            {activeTab === "profile" && <ProfileTab />}

            {/* Notifications Tab */}
            {activeTab === "notifications" && <NotificationsTab />}

            {/* Appearance Tab */}
            {activeTab === "appearance" && <AppearanceTab />}

            {/* Security Tab */}
            {activeTab === "security" && <SecurityTab />}

            {/* Data Tab */}
            {activeTab === "data" && <DataTab />}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="col-span-12 flex justify-center gap-4 mt-6 mb-3">
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
      {logedIn && (
        <div className="fixed bottom-8 md:bottom-16 right-4">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => signOut(dispatch)}
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {/* Signup Modal */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
      />
    </div>
  );
};

export default SettingsPage;
