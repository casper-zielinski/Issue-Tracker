import { Priority } from "@/generated/prisma";

export const getColor = (priority: Priority): string => {
  switch (priority) {
    case "HIGH":
      return "orange";
    case "LOW":
      return "green";
    case "MEDIUM":
      return "blue";
    case "URGENT":
      return "red";
    default:
      return "blue";
  }
};
