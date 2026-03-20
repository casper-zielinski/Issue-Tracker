import { amount, BarCharts } from "@/app/dashboard/types";
import styles from "../app/dashboard/BarCharts.module.css";

/**
 * Momentarally not used, used for a moment to display the charts when user
 * could not load issues
 * @todo to use a PlaceHolderBarChart
 */
export const PlaceholderBarCharts : BarCharts[] = [
  {
    totalamount: 0,
    amounts: [
      { amount: 0, Status: "OPEN" },
      { amount: 0, Status: "IN PROGRESS" },
      { amount: 0, Status: "CLOSED" },
    ] as amount[],
    Style: styles.barShadowGreen,
    title: "Low Priority",
    Color: "Green",
  },
  {
    totalamount: 0,
    amounts: [
      { amount: 0, Status: "OPEN" },
      { amount: 0, Status: "IN PROGRESS" },
      { amount: 0, Status: "CLOSED" },
    ] as amount[],
    Style: styles.barShadowBlue,
    title: "Medium Priority",
    Color: "Green",
  },
  {
    totalamount: 0,
    amounts: [
      { amount: 0, Status: "OPEN" },
      { amount: 0, Status: "IN PROGRESS" },
      { amount: 0, Status: "CLOSED" },
    ] as amount[],
    Style: styles.barShadowOrange,
    title: "High Priority",
    Color: "Orange",
  },
  {
    totalamount: 0,
    amounts: [
      { amount: 0, Status: "OPEN" },
      { amount: 0, Status: "IN PROGRESS" },
      { amount: 0, Status: "CLOSED" },
    ] as amount[],
    Style: styles.barShadowRed,
    title: "Urgent Priority",
    Color: "Red",
  },
];
