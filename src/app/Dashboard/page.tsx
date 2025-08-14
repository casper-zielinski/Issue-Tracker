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
import { amount, barCharts, Issue } from "./types";
import { useEffect, useState } from "react";
import axios from "axios";

const DashboardPage = () => {
  const [barChartCharts, setBarChartCharts] = useState(barCharts);
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
          className={`w-11/12 h-52 bg-gray-950 border-16 border-gray-950 ${chart.Style} rounded-2xl col-span-12 md:col-span-6 justify-self-center flex justify-center flex-col items-center`}
          key={index + chart.Title + chart.TotalAmount}
        >
          <h2 className="font-bold grid grid-cols-2">
            <span className="text-start">{chart.Title}</span>
            <div className="text-end hidden md:block">
              {loading ? (
                `Total Amount of Issues: ${mediumPriorityAmount.reduce(
                  (sum, item) => sum + item.amount,
                  0
                )}`
              ) : (
                <div>
                  <span>Total amount of Issues:</span>
                  <span className="loading loading-spinner text-accent ms-2"></span>
                </div>
              )}
            </div>
          </h2>

          {loading ? (
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={mediumPriorityAmount} title={chart.Title}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Status" className={styles.barText} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill={chart.Color} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex justify-center items-center h-10/12">
              <span className="loading loading-bars loading-xxl scale-300"></span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
