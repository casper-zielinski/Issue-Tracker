"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import axios from "axios";
import { Issue } from "../Dashboard/types";
import { $Enums } from "@/generated/prisma";

const IssuePage = () => {
  const [issues, setIssues] = useState<Issue[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchIssues() {
    try {
      const { data } = await axios.get("/api/issues");
      setIssues(data);
    } catch (error) {
      setError(true);
      console.log("Error fetching data to the Issue Page: ", error);
    } finally {
      setLoading(true);
    }
  }

  const getBadgeColorPriority = (key: $Enums.Priority) => {
    switch (key) {
      case "LOW":
        return "success";
      case "MEDIUM":
        return "info";
      case "HIGH":
        return "warning";
      case "URGENT":
        return "error";
    }
  };

  const getBadgeColorStatus = (key: $Enums.Status) => {
    switch (key) {
      case "OPEN":
        return "error";
      case "IN_PROGRESS":
        return "accent";
      case "CLOSED":
        return "success";
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="p-3 grid grid-cols-12 space-x-3 space-y-3 bg-gradient-to-br from-sky-900/20 via-black to-gray-900/20">
      <div className="col-span-12">
        <Button>
          <Link href="/Issues/new">New Issue</Link>
        </Button>
      </div>

      {error && (
        <div className="col-span-12 grid grid-cols-3 grid-flow-col">
          <div
            role="alert"
            className="alert alert-error col-span-2 md:col-span-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
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
            <span>Error! Could not load issues</span>
          </div>
        </div>
      )}

      {loading ? (
        issues?.map((issue, index) => (
          <div
            key={index}
            className="bg-gray-950 p-3 my-1 text-white col-span-12 md:col-span-6 rounded hover:shadow-lg hover:scale-101 hover:-translate-y-0.5 transition-all"
          >
            <p className="text-xl font-bold text-blue-400 mb-2">
              {issue.Title}
            </p>
            <p className="text-gray-500 my-1">Describtion:</p>
            <p className="my-1 bg-black p-2 rounded">{issue?.Issue}</p>
            <div
              className={`badge badge-${getBadgeColorPriority(issue.Priority)} m-2`}
            >
              {issue?.Priority}
            </div>
            <div
              className={`badge badge-soft badge-${getBadgeColorStatus(
                issue?.Status
              )} m-2`}
            >
              {issue?.Status}
            </div>
          </div>
        ))
      ) : (
        <>
          <div className="bg-gray-950 animate-pulse col-span-12 md:col-span-6 w-11/12 h-44 rounded"></div>
          <div className="bg-gray-950 animate-pulse col-span-12 md:col-span-6 w-11/12 h-44 rounded"></div>
          <div className="bg-gray-950 animate-pulse col-span-12 md:col-span-6 w-11/12 h-44 rounded"></div>
          <div className="bg-gray-950 animate-pulse col-span-12 md:col-span-6 w-11/12 h-44 rounded"></div>
        </>
      )}
    </div>
  );
};

export default IssuePage;
