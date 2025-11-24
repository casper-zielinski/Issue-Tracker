"use client";

import React, { useState } from "react";
import { X, Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { logIn } from "../supabase/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * LoginModal Component
 *
 * A modal component that handles user authentication through Supabase.
 * Features form validation, password visibility toggle, loading states,
 * and error handling. On successful login, updates Redux state and
 * redirects to home page.
 */
const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Loading and error states for UX feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redux and routing hooks
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  /**
   * Handles form input changes and updates state
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handles form submission with Supabase authentication
   * Validates input, authenticates user, updates Redux state,
   * and redirects on success
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Client-side validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    // login with Supabase
    logIn(formData.email, formData.password, dispatch);
    router.push("/");
  };

  /**
   * Resets form state and closes modal
   */
  const handleClose = () => {
    setError("");
    setFormData({
      email: "",
      password: "",
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
            <LogIn className="w-12 h-12 text-sky-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to your account to continue</p>
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
                placeholder="Enter your password"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Additional Options */}
        <div className="mt-4 text-center">
          <button className="text-sky-400 hover:text-sky-300 text-sm underline">
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
