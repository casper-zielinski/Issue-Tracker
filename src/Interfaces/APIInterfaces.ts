import { Priority } from "@/generated/prisma";

/**
 * Interfaces for The Api Responses, used by both frontend and backend
 */
export interface DataResponse {
  data: unknown;
  message: string;
}

export interface ErrorResponse {
  error: unknown;
  message: string;
}

export interface NewIssue {
  Title: string;
  Issue: string;
  Priority: Priority;
  author: string
}
