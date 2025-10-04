"use client";

import React, { useState } from "react";
import { X, Eye, EyeOff, User, Mail, Lock, UserPlus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { signIn } from "../../../redux/slices/userSlice";
import { signUp } from "../../../redux/slices/logSlice";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: () => void;
}

/**
 * SignupModal Component
 *
 * A modal component for user registration with Supabase authentication.
 * Includes comprehensive form validation, password confirmation,
 * password visibility toggles, and error handling. On successful
 * registration, updates Redux state and redirects to home page.
 */
const SignupModal = ({ isOpen, onClose, onSignup }: SignupModalProps) => {
  // Password visibility state for both password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form data state with all required user fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (
      !formData.email ||
      !formData.password ||
      !formData.fullName ||
      !formData.username
    ) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    dispatch(
      signIn({
        username: formData.username,
        email: data.user?.email,
      })
    );
    dispatch(signUp());
    setLoading(false);
    onClose();
    router.push("/");

    // Simulate signup process (no API call)
  };

  const handleClose = () => {
    setError("");
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      username: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md relative border border-gray-700 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <UserPlus className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400">Join us to start tracking your issues</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-error mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="input input-bordered w-full pl-10"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Username *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="input input-bordered w-full pl-10"
                placeholder="johndoe"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input input-bordered w-full pl-10"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input input-bordered w-full pl-10 pr-10"
                placeholder="Minimum 6 characters"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="input input-bordered w-full pl-10 pr-10"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Creating account...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Create Account
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
