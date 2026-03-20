"use client";

import { Button } from "@radix-ui/themes";
import { TriangleAlert, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/Constants/routes";

const error = () => {
  return (
    <div className="min-h-screen flex justify-center items-center w-full">
      <div className="bg-gray-900 rounded-xl p-2 md:p-4 lg:p-6 w-10/12 md:w-11/12 lg:w-full max-w-md relative border border-gray-700 shadow-2xl flex flex-col items-center">
        <TriangleAlert color="red" height={100} width={100} />
        <h2 className="font-bold text-2xl">Error</h2>
        <p className="font-semibold text-lg text-center text-gray-500">
          An error occurred while trying to edit this issue, it is possible that
          this issue got deleted.
        </p>
        <div className="w-full flex justify-around md:justify-center gap-4 my-2 md:mt-4">
          <Button>
            <Link href={"/"}>To Homepage</Link>
          </Button>
          <Button className="bg-black">
            <Link href={ROUTES.ISSUES}>To all Issues</Link>
          </Button>
        </div>
        <div
          className="flex gap-2 mt-4 cursor-pointer"
          onClick={() => window.location.reload()}
        >
          <RefreshCcw></RefreshCcw> Refresh Page
        </div>
      </div>
    </div>
  );
};

export default error;
