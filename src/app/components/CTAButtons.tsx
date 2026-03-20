"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { ROUTES } from "@/Constants/routes";

interface CTAButtonsProps {
  IssuesText?: string;
  DashbaoradText?: string;
}

{
  /* CTA Buttons */
}
const CTAButtons = ({ DashbaoradText, IssuesText }: CTAButtonsProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
      <button
        className="px-8 py-4 cursor-pointer bg-sky-700 hover:bg-sky-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-sky-700/25"
        onClick={() => router.push(ROUTES.ISSUES)}
      >
        {IssuesText || "Issues"}
      </button>
      <button
        className="px-8 py-4 cursor-pointer border-2 border-sky-700 text-sky-400 hover:bg-sky-700/10 font-semibold rounded-lg transition-all duration-300"
        onClick={() => router.push(ROUTES.DASHBOARD)}
      >
        {DashbaoradText || "Dashboard"}
      </button>
    </div>
  );
};

export default CTAButtons;
