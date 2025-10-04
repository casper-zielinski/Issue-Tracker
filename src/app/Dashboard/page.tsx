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
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import GradientOrbs from "../GradientOrbs";
import { DashboardIcon } from "@radix-ui/react-icons";

/**
 * DashboardPage Component
 *
 * A comprehensive analytics dashboard that visualizes issue data using Recharts.
 * Features include:
 * - Interactive bar charts showing issues by priority and status
 * - Sorting functionality for chart data
 * - Real-time data fetching from API
 * - Responsive chart design with loading states
 * - Color-coded priority visualization (Low: Green, Medium: Blue, High: Orange, Urgent: Red)
 */
const DashboardPage = () => {
  // State management for issues data and chart configuration
  const [issues, setIssues] = useState<Issue[]>();
  const [loading, setLoading] = useState(true);
  const [barCharts, setBarCharts] = useState<BarCharts[]>([]);
  const [defaultBarChart, setDefaultBarChart] = useState<BarCharts[]>([]);
  const [error, setError] = useState(false);

  /**
   * Fetches issues data from API endpoint
   * Used to populate dashboard charts and analytics
   */
  async function fetchIssues() {
    try {
      const { data } = await axios.get("/api/issues");
      setIssues(data);
    } catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    fetchIssues();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const barCharted = useMemo(() => {
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

    setBarCharts(barChartsValues);
    setDefaultBarChart(barChartsValues);
    setLoading(false);
    return barChartsValues;
  }, [issues]);

  return (
    <div className="grid gap-y-7 grid-cols-12 min-h-screen bg-gradient-to-br from-sky-900/20 via-black to-gray-900/20 scrollbar-hide">
      <div className="col-span-12 text-center my-4">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <DashboardIcon className="w-10 h-10 text-sky-400" />
          Dashboard
        </h1>
        <p className="text-gray-300 text-lg">
          View your Issues under a Dashboard
        </p>
      </div>

      <SortButton
        Barchart={barCharts}
        DefaultBarChart={defaultBarChart}
        setBarChart={setBarCharts}
      />

      {error && (
        <div className="col-span-12 grid grid-cols-3 grid-flow-col p-3">
          <div role="alert" className="alert alert-error col-span-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 md:h-9 w-6 md:w-9 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="md:text-lg">Error! Could not load issues</span>
            <button
              className="btn btn-sm md:btn-md btn-neutral rounded-2xl"
              onClick={() => setError(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {!loading ? (
        barCharts?.map((chart, index) => (
          <div
            className={`w-11/12 h-72 bg-gray-900 border-16 border-gray-900 ${chart.Style} rounded-2xl col-span-12 md:col-span-6 justify-self-center justify-center flex-col items-center mb-4`}
            key={index}
          >
            <>
              <h2 className="font-bold grid grid-cols-2 text-sm sm:text-base mb-3">
                <span className="text-start">{chart.title}</span>
                <div className="text-end">
                  Total Amount of Issues: {chart.totalamount}
                </div>
              </h2>

              <ResponsiveContainer width="100%" height="80%">
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
        ))
      ) : (
        <>
          <div
            className={`w-11/12 h-52 bg-gray-500 border-16 border-gray-500 rounded-2xl col-span-12 md:col-span-6 justify-self-center justify-center animate-pulse mb-4`}
          ></div>
          <div
            className={`w-11/12 h-52 bg-gray-500 border-16 border-gray-500 rounded-2xl col-span-12 md:col-span-6 justify-self-center justify-center animate-pulse mb-4`}
          ></div>
          <div
            className={`w-11/12 h-52 bg-gray-500 border-16 border-gray-500 rounded-2xl col-span-12 md:col-span-6 justify-self-center justify-center animate-pulse mb-4`}
          ></div>
          <div
            className={`w-11/12 h-52 bg-gray-500 border-16 border-gray-500 rounded-2xl col-span-12 md:col-span-6 justify-self-center justify-center animate-pulse mb-4`}
          ></div>
        </>
      )}
      <GradientOrbs classname="hidden md:block -z-10 top-0 left-1/4 w-80 h-80" />
    </div>
  );
};

export default DashboardPage;
