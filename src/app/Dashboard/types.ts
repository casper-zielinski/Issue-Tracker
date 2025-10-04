import { $Enums } from "@/generated/prisma";

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

export interface BarCharts {
  totalamount: number;
  amounts: amount[];
  Style: string;
  title: string;
  Color: string;
}

export type Chart = {
  Style: string;
  Title: string;
  Color: string;
};
