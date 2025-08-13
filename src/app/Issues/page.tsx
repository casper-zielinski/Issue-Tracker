"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import axios from "axios";
import { Issue } from "../Dashboard/types";

const IssuePage = () => {
  const [issues, setIssues] = useState<Issue[]>();
  const [erorr, setError] = useState(false);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="p-3 grid grid-cols-12 space-x-3 space-y-3">
      <div className="col-span-12">
        <Button>
          <Link href="/Issues/new">New Issue</Link>
        </Button>
      </div>

      {issues?.map((issue, index) => (
        <div
          key={index}
          className="bg-gray-950 p-3 my-1 text-white col-span-12 md:col-span-6 rounded hover:shadow-lg hover:scale-101 hover:translate-y-1.5 transition-all"
        >
          <p className="text-xl font-bold text-blue-400 mb-2">{issue.Title}</p>
          <p className="text-gray-500 my-1">Describtion:</p>
          <p className="my-1 bg-black p-2 rounded">{issue.Issue}</p>
          <p>{issue.Priority}</p>
          <p>{issue.Status}</p>
          <p>{issue.id}</p>
        </div>
      ))}
    </div>
  );
};

export default IssuePage;
