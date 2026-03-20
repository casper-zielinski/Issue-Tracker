"use server";

import { Plus, Edit, BadgeAlert } from "lucide-react";
import GradientOrbs from "../components/GradientOrbs";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { getBadgeColorPriority, getBadgeColorStatus } from "@/hooks/useBadge";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/Constants/routes";

const IssuePage = async () => {
  let error: boolean = false;
  const getIssues = async () => {
    try {
      const supabase = await createClient();
      return (await supabase.from("Issue").select("*")).data;
    } catch (err) {
      console.error(err);
      error = true;
      return;
    }
  };

  const issues = (await getIssues()) || [];

  return (
    <div className="p-3 pt-6 bg-gradient-to-br from-sky-900/20 via-black to-gray-900/20 min-h-screen">
      <div className="text-center flex flex-col my-2">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <AiOutlineIssuesClose className="w-10 h-10 text-sky-400" />
          Issues
        </h1>
        <p className="text-gray-300 text-lg">View and Edit your Issues</p>
        <div className="self-start my-5">
          <Link className="btn btn-primary btn-md" href={ROUTES.ISSUES_NEW}>
            New Issue
            <Plus />
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-1 top-1/2 left-1/2 -translate-1/2">
          <div role="alert" className="alert alert-error w-[85vw]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 md:h-9 w-6 md:w-9 shrink-0 stroke-current"
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
            <p className="md:text-lg">
              <span className="font-bold">Error! Could not load issues</span>{" "}
              <br />
              Try checking your internet connection
            </p>
          </div>
        </div>
      )}

      {issues?.length === 0 && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center space-y-3.5 bg-gray-900 rounded-xl p-6 max-w-md relative border border-gray-700 shadow-2xl">
            <BadgeAlert
              className="md:scale-110 lg:scale-125"
              width={70}
              height={70}
            ></BadgeAlert>
            <p className="text-center font-bold md:text-xl lg:text-2xl">
              No issues found. Create a new one!
            </p>
            <Link href={ROUTES.ISSUES_NEW} className="cursor-pointer">
              <Button className="lg:scale-110">To Create new Issue</Button>
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-4 my-5">
        {issues?.map((issue) => (
          <div
            key={issue.id}
            className="bg-gray-900 max-h-52 p-3 my-1 w-full text-white col-span-12 md:col-span-6 rounded hover:scale-101 hover:-translate-y-0.5 transition-all"
          >
            <p className="text-xl font-bold text-blue-400 mb-2">
              {issue.Title}
            </p>
            <p className="text-gray-500 my-1">Describtion:</p>
            <p className="my-1 bg-black p-2 rounded">{issue?.Issue}</p>
            <div className="grid grid-cols-4 space-x-7 items-center">
              <div className="col-span-1 flex">
                <span
                  className={`badge ${getBadgeColorPriority(
                    issue.Priority,
                  )} m-2`}
                >
                  {issue?.Priority}
                </span>
                <span
                  className={`badge badge-soft ${getBadgeColorStatus(
                    issue?.Status,
                  )} m-2 ${issue?.Status?.startsWith("IN") ? "badge-lg text-xs p-2" : ""}`}
                >
                  {issue?.Status.replace("_", " ")}
                </span>
              </div>
              <Link
                className="col-span-3 justify-self-end hover:scale-105 hover:shadow-2xl cursor-pointer"
                href={ROUTES.ISSUES_EDIT(issue.id)}
              >
                <Edit />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <GradientOrbs classname="top-32 left-8 w-24 h-24 -z-10" />
      <GradientOrbs classname="bottom-10 right-8 w-96 h-96 -z-10" />
    </div>
  );
};

export default IssuePage;
