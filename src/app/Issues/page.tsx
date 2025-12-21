"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Issue } from "../Dashboard/types";
import { Status, Priority } from "@/generated/prisma";
import { Plus, Edit } from "lucide-react";
import GradientOrbs from "../GradientOrbs";
import { useRouter } from "next/navigation";
import { AiOutlineIssuesClose } from "react-icons/ai";

/**
 * IssuePage Component
 *
 * Main issues listing page that displays all user issues in a grid layout.
 * Features include:
 * - Fetching issues from API endpoint
 * - Priority and status badge display with color coding
 * - Loading states with skeleton animations
 * - Error handling with user-friendly alerts
 * - Navigation to create new issues and edit existing ones
 */
const IssuePage = () => {
  // State management for issues data and UI states
  const [issues, setIssues] = useState<Issue[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /**
   * Fetches all issues from the API endpoint
   * Updates loading and error states accordingly
   */
  async function fetchIssues() {
    try {
      const {
        data: {
          data: { issues },
        },
      } = await axios.get("/api/issues");
      setIssues(issues);
    } catch (error) {
      setError(true);
      console.log("Error fetching data to the Issue Page: ", error);
    } finally {
      setLoading(true);
    }
  }

  /**
   * Returns appropriate DaisyUI badge color class based on issue priority
   * @param key - Priority enum value
   * @returns CSS class string for badge styling
   */
  const getBadgeColorPriority = (key: Priority) => {
    switch (key) {
      case "LOW":
        return "badge-success";
      case "MEDIUM":
        return "badge-info";
      case "HIGH":
        return "badge-warning";
      case "URGENT":
        return "badge-error";
    }
  };

  /**
   * Returns appropriate DaisyUI badge color class based on issue status
   * @param key - Status enum value
   * @returns CSS class string for badge styling
   */
  const getBadgeColorStatus = (key: Status) => {
    switch (key) {
      case "OPEN":
        return "badge-error";
      case "IN_PROGRESS":
        return "badge-accent";
      case "CLOSED":
        return "badge-success";
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="p-3 pt-6 bg-gradient-to-br from-sky-900/20 via-black to-gray-900/20 min-h-screen">
      <div className="text-center flex flex-col my-2">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <AiOutlineIssuesClose className="w-10 h-10 text-sky-400" />
          Issues
        </h1>
        <p className="text-gray-300 text-lg">View and Edit your Issues</p>
        <div className="self-start my-5">
          <button
            className="btn btn-primary btn-md"
            onClick={() => router.push("/Issues/new")}
          >
            New Issue
            <Plus />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-1 absolute top-1/2 left-1/2 -translate-1/2">
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

      {issues?.length === 0 && loading && (
        <div className="col-span-12 p-10 h-10 grid grid-cols-3 grid-flow-col md:justify-center">
          <div role="alert" className="alert alert-info col-span-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="md:text-lg">
              No issues found. Create a new one!
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-4 my-5">
        {loading ? (
          issues?.map((issue) => (
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
                      issue.Priority
                    )} m-2`}
                  >
                    {issue?.Priority}
                  </span>
                  <span
                    className={`badge badge-soft ${getBadgeColorStatus(
                      issue?.Status
                    )} m-2`}
                  >
                    {issue?.Status}
                  </span>
                </div>
                <div
                  className="col-span-3 justify-self-end hover:scale-105 hover:shadow-2xl"
                  onClick={() => {
                    console.log("issue id: ", issue.id);
                    console.log("issue:", issue.Title);
                  }}
                >
                  <Edit />
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="bg-gray-500 animate-pulse col-span-12 md:col-span-6 w-full h-60 rounded"></div>
            <div className="bg-gray-500 animate-pulse col-span-12 md:col-span-6 w-full h-60 rounded"></div>
            <div className="bg-gray-500 animate-pulse col-span-12 md:col-span-6 w-full h-60 rounded"></div>
            <div className="bg-gray-500 animate-pulse col-span-12 md:col-span-6 w-full h-60 rounded"></div>
          </>
        )}
      </div>
      <GradientOrbs classname="top-32 left-8 w-24 h-24 -z-10" />
      <GradientOrbs classname="bottom-10 right-8 w-96 h-96 -z-10" />
    </div>
  );
};

export default IssuePage;
