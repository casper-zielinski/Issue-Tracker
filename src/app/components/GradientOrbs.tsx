import React from "react";

interface GradientOrbsProps {
      classname: string;
}

/**
 * GradientOrbs Component
 *
 * Decorative animated background element that creates floating gradient orbs.
 * Provides visual enhancement with CSS animations and blur effects.
 * Used throughout the application for consistent visual theming.
 *
 * @param classname - CSS classes for positioning and sizing the orb
 */
const GradientOrbs = ({ classname } : GradientOrbsProps) => {
  return (
    <div className={`absolute ${classname} bg-sky-700/20 rounded-full blur-3xl animate-pulse`}></div>
  );
};

export default GradientOrbs;
