export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  ISSUES: "/issues",
  ISSUES_NEW: "/issues/new",
  ISSUES_EDIT: (id: string | number) => `/issues/edit/${id}`,
  SETTINGS: "/settings",
} as const;
