/**
 * Interfaces for The Api Responses, used by both frontend and backend
 */
export interface DataResponse {
  data: unknown;
  status: number;
  message: string;
}

export interface ErrorResponse {
  error: unknown;
  status: number;
  message: string;
}
