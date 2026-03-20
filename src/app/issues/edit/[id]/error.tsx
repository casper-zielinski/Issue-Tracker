"use client";

import { TriangleAlert, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/Constants/routes";

const error = () => {
  return (
    <div className="min-h-screen flex justify-center items-center w-full bg-gradient-to-br from-sky-900/20 via-black to-gray-900/20">
      <div className="bg-gray-900 rounded-xl p-6 sm:p-8 lg:p-10 w-11/12 sm:w-10/12 max-w-lg relative border border-gray-700 shadow-2xl flex flex-col items-center gap-2">
        <TriangleAlert className="text-red-500" height={80} width={80} />
        <h2 className="font-bold text-4xl text-white mt-2">Error</h2>
        <p className="font-semibold text-lg text-center text-gray-300">
          An error occurred while trying to edit this issue, it is possible that
          this issue got deleted.
        </p>
        <div className="w-full flex flex-col sm:flex-row justify-center gap-3 mt-4">
          <Link
            href={"/"}
            className="px-6 py-3 cursor-pointer bg-sky-700 hover:bg-sky-600 text-white font-semibold rounded-lg transition-all duration-300 text-center hover:shadow-lg hover:shadow-sky-700/25"
          >
            To Homepage
          </Link>
          <Link
            href={ROUTES.ISSUES}
            className="px-6 py-3 cursor-pointer border-2 border-sky-700 text-sky-400 hover:bg-sky-700/10 font-semibold rounded-lg transition-all duration-300 text-center"
          >
            To all Issues
          </Link>
        </div>
        <div
          className="flex gap-2 mt-4 cursor-pointer text-gray-500 hover:text-gray-300 transition-colors duration-200"
          onClick={() => window.location.reload()}
        >
          <RefreshCcw /> Refresh Page
        </div>
      </div>
    </div>
  );
};

export default error;
