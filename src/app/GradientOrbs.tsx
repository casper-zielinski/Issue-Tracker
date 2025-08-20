import React from "react";

interface GradientOrbsProps {
      classname: string;
}

const GradientOrbs = ({ classname } : GradientOrbsProps) => {
  return (
    <div className={`absolute ${classname} bg-sky-700/20 rounded-full blur-3xl animate-pulse`}></div>
  );
};

export default GradientOrbs;
