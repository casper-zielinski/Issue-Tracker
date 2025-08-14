import { $Enums } from "@/generated/prisma";
import styles from "./BarCharts.module.css";

export interface Issue {
  id: number;
  Title: string;
  Issue: string;
  Status: $Enums.Status;
  Priority: $Enums.Priority;
  createdAt: Date;
  updatedAt: Date;
  author: string | null;
}

export interface amount {
  amount: number;
  Status: string;
}

export type Chart = {
  Style: string;
  Title: string;
  Color: string;
};

export const barCharts: Chart[] = [
  {
    Style: styles.barShadowBlue,
    Title: "Medium Priority",
    Color: "#8884d8",
  },
  {
    Style: styles.barShadowOrange,
    Title: "High Priority",
    Color: "#EB970C",
  },
  {
    Style: styles.barShadowRed,
    Title: "Urgent Priority",
    Color: "#EB130C",
  },
  {
    Style: styles.barShadowGreen,
    Title: "Low Priority",
    Color: "#82ca9d",
  },
];

export const barChartsPriority: Chart[] = [
  {
    Style: styles.barShadowGreen,
    Title: "Low Priority",
    Color: "#82ca9d",
  },
  {
    Style: styles.barShadowBlue,
    Title: "Medium Priority",
    Color: "#8884d8",
  },
  {
    Style: styles.barShadowOrange,
    Title: "High Priority",
    Color: "#EB970C",
  },
  {
    Style: styles.barShadowRed,
    Title: "Urgent Priority",
    Color: "#EB130C",
  },
];
