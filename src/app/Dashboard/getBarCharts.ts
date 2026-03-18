import { BarCharts, amount } from "@/app/Dashboard/types";
import { Issue } from "@/generated/prisma";
import styles from "./BarCharts.module.css";

export function getBarChartsFromIssues(issues?: Issue[]): BarCharts[] | null {
  if (!issues || issues.length === 0) {
    return null;
  }

  const lowPriorityAmount: amount[] = [
    {
      amount: issues.filter(
        (current) => current.Status === "OPEN" && current.Priority === "LOW",
      ).length,
      Status: "OPEN",
    },
    {
      amount: issues.filter(
        (current) => current.Status === "CLOSED" && current.Priority === "LOW",
      ).length,
      Status: "CLOSED",
    },
    {
      amount: issues.filter(
        (current) =>
          current.Status === "IN_PROGRESS" && current.Priority === "LOW",
      ).length,
      Status: "IN PROGRESS",
    },
  ];

  const mediumPriorityAmount: amount[] = [
    {
      amount: issues.filter(
        (current) => current.Status === "OPEN" && current.Priority === "MEDIUM",
      ).length,
      Status: "OPEN",
    },
    {
      amount: issues.filter(
        (current) =>
          current.Status === "CLOSED" && current.Priority === "MEDIUM",
      ).length,
      Status: "CLOSED",
    },
    {
      amount: issues.filter(
        (current) =>
          current.Status === "IN_PROGRESS" && current.Priority === "MEDIUM",
      ).length,
      Status: "IN PROGRESS",
    },
  ];

  const highPriorityAmount: amount[] = [
    {
      amount: issues.filter(
        (current) => current.Status === "OPEN" && current.Priority === "HIGH",
      ).length,
      Status: "OPEN",
    },
    {
      amount: issues.filter(
        (current) => current.Status === "CLOSED" && current.Priority === "HIGH",
      ).length,
      Status: "CLOSED",
    },
    {
      amount: issues.filter(
        (current) =>
          current.Status === "IN_PROGRESS" && current.Priority === "HIGH",
      ).length,
      Status: "IN PROGRESS",
    },
  ];

  const urgentPriorityAmount: amount[] = [
    {
      amount: issues.filter(
        (current) => current.Status === "OPEN" && current.Priority === "URGENT",
      ).length,
      Status: "OPEN",
    },
    {
      amount: issues.filter(
        (current) =>
          current.Status === "CLOSED" && current.Priority === "URGENT",
      ).length,
      Status: "CLOSED",
    },
    {
      amount: issues.filter(
        (current) =>
          current.Status === "IN_PROGRESS" && current.Priority === "URGENT",
      ).length,
      Status: "IN PROGRESS",
    },
  ];

  const barChartsValues: BarCharts[] = [
    {
      totalamount: lowPriorityAmount.reduce(
        (prev, curr) => prev + curr.amount,
        0,
      ),
      amounts: lowPriorityAmount,
      Style: styles.barShadowGreen,
      title: "Low Priority",
      Color: "Green",
    },
    {
      totalamount: mediumPriorityAmount.reduce(
        (prev, curr) => prev + curr.amount,
        0,
      ),
      amounts: mediumPriorityAmount,
      Style: styles.barShadowBlue,
      title: "Medium Priority",
      Color: "Blue",
    },
    {
      totalamount: highPriorityAmount.reduce(
        (prev, curr) => prev + curr.amount,
        0,
      ),
      amounts: highPriorityAmount,
      Style: styles.barShadowOrange,
      title: "High Priority",
      Color: "Orange",
    },
    {
      totalamount: urgentPriorityAmount.reduce(
        (prev, curr) => prev + curr.amount,
        0,
      ),
      amounts: urgentPriorityAmount,
      Style: styles.barShadowRed,
      title: "Urgent Priority",
      Color: "Red",
    },
  ];

  return barChartsValues;
}
