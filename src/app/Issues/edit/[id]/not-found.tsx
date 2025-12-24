"use client";

import React from "react";
import GradientOrbs from "@/app/GradientOrbs";
import CTAButtons from "@/app/components/CTAButtons";

const NotFoundPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-900/20 via-black to-gray-900/20">
      <div className="text-center px-6 py-12 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-slate-300 dark:text-slate-700">
            404
          </h1>
          <div className="h-1 w-24 bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Issue Not Found
        </h2>

        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          The issue you&apos;re trying to edit doesn&apos;t exist or may have
          been deleted.
        </p>

        <CTAButtons
          DashbaoradText={"Back to Dashboard"}
          IssuesText={"Back to Issues"}
        />

        <div className="mt-12 text-slate-500 dark:text-slate-500 text-sm">
          <p>Need help? Check if the issue ID is correct.</p>
        </div>
      </div>
      <GradientOrbs classname=" -z-10 top-0 left-1/4 w-80 h-80" />
      <GradientOrbs classname=" -z-10 top-1/4 left-1/4 w-96 h-96" />
      <GradientOrbs classname="hidden md:block -z-10 bottom-1/4 right-1/4 w-96 h-96" />
    </section>
  );
};

export default NotFoundPage;
