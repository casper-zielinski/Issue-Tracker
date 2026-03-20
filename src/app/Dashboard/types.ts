import { Priority, Status } from "@/types/enums";

export interface Issue {
  id: number;
  Title: string;
  Issue: string;
  Status: Status;
  Priority: Priority;
  createdAt: Date;
  updatedAt: Date;
  author: string | null;
}

export interface IssueSerializable {
  id: number;
  Title: string;
  Issue: string;
  Status: Status;
  Priority: Priority;
  createdAt: string;
  updatedAt: string;
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
