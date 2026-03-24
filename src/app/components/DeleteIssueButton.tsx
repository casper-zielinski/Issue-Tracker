"use client";

import { Trash2 } from "lucide-react";
import React from "react";
import { deleteIssue } from "../api/issues/actions";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <button
      className="hover:scale-105 hover:shadow-2xl"
      type="button"
      onClick={() => deleteIssue(issueId)}
    >
      <Trash2 />
    </button>
  );
};

export default DeleteIssueButton;
