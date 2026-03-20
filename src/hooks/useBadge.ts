import { Status, Priority } from "@/types/enums";

/**
 * Returns appropriate DaisyUI badge color class based on issue priority
 * @param key - Priority enum value
 * @returns CSS class string for badge styling
 */
export const getBadgeColorPriority = (key: Priority | string) => {
  switch (key) {
    case "LOW":
      return "badge-success";
    case "MEDIUM":
      return "badge-info";
    case "HIGH":
      return "badge-warning";
    case "URGENT":
      return "badge-error";
    default:
      throw new Error("Invalid Priority");
  }
};

/**
 * Returns appropriate DaisyUI badge color class based on issue status
 * @param key - Status enum value
 * @returns CSS class string for badge styling
 */
export const getBadgeColorStatus = (key: Status | string) => {
  switch (key) {
    case "OPEN":
      return "badge-error";
    case "IN_PROGRESS":
      return "badge-accent";
    case "CLOSED":
      return "badge-success";
    case "IN PROGRESS":
      return "badge-accent";
    case "INPROGRESS":
      return "badge-accent";
    default:
      throw new Error("Invalid Status");
  }
};
