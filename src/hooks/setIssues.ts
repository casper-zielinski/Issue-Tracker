import { amount, BarCharts, Issue } from "@/app/Dashboard/types";
import { useMemo } from "react";
import styles from "../app/Dashboard/BarCharts.module.css";

export function SetBarCharts(issues: Issue[]): BarCharts[] {
  const defaultIssue = useMemo(() => {
    if (!issues || issues?.length < 0) return;

    const lowPriorityAmount: amount[] = [
      {
        amount:
          issues?.filter(
            (current) => current.Status === "OPEN" && current.Priority === "LOW"
          ).length ?? 0,
        Status: "OPEN",
      },
      {
        amount:
          issues?.filter(
            (current) =>
              current.Status === "CLOSED" && current.Priority === "LOW"
          ).length ?? 0,
        Status: "CLOSED",
      },
      {
        amount:
          issues?.filter(
            (current) =>
              current.Status === "IN_PROGRESS" && current.Priority === "LOW"
          ).length ?? 0,
        Status: "IN PROGRESS",
      },
    ];

    const mediumPriorityAmount: amount[] = [
      {
        amount:
          issues?.filter(
            (current) =>
              current.Status === "OPEN" && current.Priority === "MEDIUM"
          ).length ?? 0,
        Status: "OPEN",
      },
      {
        amount:
          issues?.filter(
            (current) =>
              current.Status === "CLOSED" && current.Priority === "MEDIUM"
          ).length ?? 0,
        Status: "CLOSED",
      },
      {
        amount:
          issues?.filter(
            (current) =>
              current.Status === "IN_PROGRESS" && current.Priority === "MEDIUM"
          ).length ?? 0,
        Status: "IN PROGRESS",
      },
    ];

    const highPriorityAmount: amount[] = [
      {
        amount:
          issues?.filter(
            (current) =>
              current.Status === "OPEN" && current.Priority === "HIGH"
          ).length ?? 0,
        Status: "OPEN",
      },
      {
        amount:
          issues?.filter(
            (current) =>
              current.Status === "CLOSED" && current.Priority === "HIGH"
          ).length ?? 0,
        Status: "CLOSED",
      },
      {
        amount:
          issues?.filter(
            (current) =>
              current.Status === "IN_PROGRESS" && current.Priority === "HIGH"
          ).length ?? 0,
        Status: "IN PROGRESS",
      },
    ];

    const urgentPriorityAmount: amount[] = [
      {
        amount:
          issues?.filter(
            (current) =>
              current.Status === "OPEN" && current.Priority === "URGENT"
          ).length ?? 0,
        Status: "OPEN",
      },
      {
        amount:
          issues?.filter(
            (current) =>
              current.Status === "CLOSED" && current.Priority === "URGENT"
          ).length ?? 0,
        Status: "CLOSED",
      },
      {
        amount:
          issues?.filter(
            (current) =>
              current.Status === "IN_PROGRESS" && current.Priority === "URGENT"
          ).length ?? 0,
        Status: "IN PROGRESS",
      },
    ];

    const barChartsValues: BarCharts[] = [
      {
        totalamount: lowPriorityAmount.reduce(
          (prev, curr) => prev + curr.amount,
          0
        ),
        amounts: lowPriorityAmount,
        Style: styles.barShadowGreen,
        title: "Low Priority",
        Color: "Green",
      },
      {
        totalamount: mediumPriorityAmount.reduce(
          (prev, curr) => prev + curr.amount,
          0
        ),
        amounts: mediumPriorityAmount,
        Style: styles.barShadowBlue,
        title: "Medium Priority",
        Color: "Blue",
      },
      {
        totalamount: highPriorityAmount.reduce(
          (prev, curr) => prev + curr.amount,
          0
        ),
        amounts: highPriorityAmount,
        Style: styles.barShadowOrange,
        title: "High Priority",
        Color: "Orange",
      },
      {
        totalamount: urgentPriorityAmount.reduce(
          (prev, curr) => prev + curr.amount,
          0
        ),
        amounts: urgentPriorityAmount,
        Style: styles.barShadowRed,
        title: "Urgent Priority",
        Color: "Red",
      },
    ];

    return barChartsValues;
  }, [issues]);

  return defaultIssue || [];
}
