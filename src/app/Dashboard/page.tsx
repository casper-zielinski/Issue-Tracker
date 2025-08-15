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
import { amount, BarCharts, Issue } from "./types";
import { useEffect, useState } from "react";
import axios from "axios";

const DashboardPage = () => {
  const [issues, setIssues] = useState<Issue[]>();
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
    }
  }

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
          (current) => current.Status === "CLOSED" && current.Priority === "LOW"
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
          (current) => current.Status === "OPEN" && current.Priority === "HIGH"
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

  const barCharts: BarCharts[] = [
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

  return (
    <div className="grid gap-x-3 gap-y-6 grid-cols-12 mt-10 mb-5">
      <h1 className="col-span-12 text-3xl font-bold text-center">Dashboard</h1>

      <SortButton />

      {barCharts.map((chart, index) =>
        loading ? (
          <div
            className={`w-11/12 h-52 bg-gray-950 border-16 border-gray-950 ${chart.Style} rounded-2xl col-span-12 md:col-span-6 justify-self-center justify-center flex-col items-center`}
            key={index}
          >
            <>
              <h2 className="font-bold grid grid-cols-2">
                <span className="text-start">{chart.title}</span>
                <div className="text-end hidden md:block">
                  Total Amount of Issues: {chart.totalamount}
                </div>
              </h2>

              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={chart?.amounts} title={chart.title}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Status" className={styles.barText} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill={chart.Color} />
                </BarChart>
              </ResponsiveContainer>
            </>
          </div>
        ) : (
          <div
            key={index}
            className="w-11/12 h-52 bg-gray-600 border-16 border-gray-600 animate-pulse col-span-12 md:col-span-6 rounded justify-self-center"
          ></div>
        )
      )}
    </div>
  );
};

export default DashboardPage;
