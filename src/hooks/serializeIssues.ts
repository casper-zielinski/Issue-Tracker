import { Issue, IssueSerializable } from "@/app/Dashboard/types";

export const serializeIssues = (issues: Issue[]): IssueSerializable[] => {
  const serializedIssues = issues.map((issue) => ({
    ...issue,
    createdAt: new Date(issue.createdAt).toISOString(),
    updatedAt: new Date(issue.updatedAt).toISOString(),
  }));

  return serializedIssues;
};

export const deserializeIssues = (
  serializedIssues: IssueSerializable[]
): Issue[] => {
  const issues = serializedIssues.map((issue) => ({
    ...issue,
    createdAt: new Date(issue.createdAt),
    updatedAt: new Date(issue.updatedAt),
  }));

  return issues;
};
