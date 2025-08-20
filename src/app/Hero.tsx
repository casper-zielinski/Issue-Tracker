"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Clock, TrendingUp, Users } from "lucide-react";
import GradientOrbs from "./GradientOrbs";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="relative bg-black min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-black to-gray-900/20"></div>
      <div className="absolute inset-0 opacity-10"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Main Heading */}
        <div className="mb-8 mt-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Track Issues
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600">
              and get things done
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Add and Close Issues while Tracking them using this Issue Tracker
            and AI
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            className="px-8 py-4 bg-sky-700 hover:bg-sky-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-sky-700/25"
            onClick={() => router.push("/Issues")}
          >
            Issues
          </button>
          <button
            className="px-8 py-4 border-2 border-sky-700 text-sky-400 hover:bg-sky-700/10 font-semibold rounded-lg transition-all duration-300"
            onClick={() => router.push("/Dashboard")}
          >
            Dashboard
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-4">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <AlertCircle className="w-8 h-8 text-sky-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">10K+</div>
            <div className="text-sm text-gray-400">Issues Tracked</div>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Users className="w-8 h-8 text-sky-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">500+</div>
            <div className="text-sm text-gray-400">Active Teams</div>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Clock className="w-8 h-8 text-sky-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">40%</div>
            <div className="text-sm text-gray-400">Faster Resolution</div>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-2">
              <TrendingUp className="w-8 h-8 text-sky-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">99.9%</div>
            <div className="text-sm text-gray-400">Uptime</div>
          </div>
        </div>
      </div>

      {/* Gradient Orbs */}
      <GradientOrbs classname="top-1/4 left-1/4 w-96 h-96" />
      <GradientOrbs classname="bottom-1/4 right-1/4 w-96 h-96" />
    </div>
  );
};

export default Hero;
