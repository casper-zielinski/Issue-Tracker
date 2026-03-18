"use server";

import React from "react";
import GradientOrbs from "./GradientOrbs";
import CTAButtons from "./components/CTAButtons";

const Hero = () => {
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
          </p>
        </div>

        {/* CTA Buttons */}
        <CTAButtons />
      </div>

      {/* Gradient Orbs */}
      <GradientOrbs classname="top-1/4 left-1/4 w-96 h-96" />
      <GradientOrbs classname="bottom-1/4 right-1/4 w-96 h-96" />
    </div>
  );
};

export default Hero;
