"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import styles from "./BarCharts.module.css";
import SortButton from "./SortButton";
import { barCharts } from "./types";
import { useEffect, useState } from "react";
import axios from "axios";
import { $Enums } from "@/generated/prisma";

interface Issue {
  id: number;
  Title: string;
  Issue: string;
  Status: $Enums.Status;
  Priority: $Enums.Priority;
  createdAt: Date;
  updatedAt: Date;
  author: string | null;
}

interface amount {
  amount: number;
  Status: string;
}

const DashboardPage = () => {
  const [barChartCharts, setBarChartCharts] = useState(barCharts);
  const [issues, setIssues] = useState<Issue[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssues();
  }, []);

  async function fetchIssues() {
    try {
      const { data } = await axios.get("/api/issues");
      setIssues(data);
    } catch (error) {
      console.log("Error fetching data to the Bar Charts: ", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Is Loading...</div>;

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

  return (
    <div className="grid gap-x-3 gap-y-6 grid-cols-12 mt-10 mb-5">
      <h1 className="col-span-12 text-3xl font-bold text-center">Dashboard</h1>

      <SortButton
        barChartsProp={barChartCharts}
        setBarCharts={setBarChartCharts}
      />

      {barChartCharts.map((chart, index) => (
        <div
          className={`w-11/12 h-52 bg-black border-16 border-black ${chart.Style} rounded-2xl col-span-12 md:col-span-6 justify-self-center`}
          key={index + chart.Title + chart.TotalAmount}
        >
          <h2 className="font-bold grid grid-cols-2">
            <span className="text-start">{chart.Title}</span>
            <span className="text-end hidden md:block">{`Total Amount of Issues: ${mediumPriorityAmount.reduce(
              (sum, item) => sum + item.amount,
              0
            )}`}</span>
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mediumPriorityAmount} title={chart.Title}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Status" className={styles.barText} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill={chart.Color} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
