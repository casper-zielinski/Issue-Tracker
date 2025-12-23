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
import { BarCharts, Issue } from "./types";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import GradientOrbs from "../GradientOrbs";
import { DashboardIcon } from "@radix-ui/react-icons";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setIssuesCache } from "../../../redux/slices/issuesSlice";
import { deserializeIssues, serializeIssues } from "@/hooks/serializeIssues";
import { SetBarCharts } from "@/hooks/setIssues";

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
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [barCharts, setBarCharts] = useState<BarCharts[]>([]);
  const [error, setError] = useState(false);
  const issuesCache = useSelector(
    (state: RootState) => state.issueState.issues
  );
  const dispatch: AppDispatch = useDispatch();

  /**
   * Fetches issues data from API endpoint
   * Used to populate dashboard charts and analytics
   * calls the api if the cache is empty, otherwise uses the cache
   */
  const fetchIssues = useCallback(async () => {
    if (!issuesCache || issuesCache.length === 0) {
      try {
        const {
          data: {
            data: { issues },
          },
        } = await axios.get("/api/issues");
        setIssues(issues);
        dispatch(setIssuesCache({ issues: serializeIssues(issues) }));
      } catch (error) {
        console.error(error);
        setError(true);
      }
    } else {
      setIssues(deserializeIssues(issuesCache));
    }

    setLoading(false);
    return;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  // to set the default barchart for the first render */
  const defaultBarChart = SetBarCharts(issues);

  // setting the state barchart with the defaultbarchart state, which will change after using the sort button */
  useEffect(() => {
    setBarCharts(defaultBarChart);
  }, [defaultBarChart]);

  return (
    <section className="p-3 pt-6 relative min-h-screen bg-gradient-to-br from-sky-900/20 via-black to-gray-900/20 scrollbar-hide">
      <div className="text-center mb-2">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <DashboardIcon className="w-10 h-10 text-sky-400" />
          Dashboard
        </h1>
        <p className="text-gray-300 text-lg">
          View your Issues under a Dashboard
        </p>
        <div className="justify-self-start my-5">
          <SortButton
            DefaultBarChart={defaultBarChart || barCharts}
            setBarChart={setBarCharts}
          />
        </div>
      </div>

      {error && (
        <div className="p-1 absolute top-1/2 left-1/2 -translate-1/2">
          <div role="alert" className="alert alert-error w-[85vw]">
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
            <p className="md:text-lg">
              <span className="font-bold">Error! Could not load issues</span>{" "}
              <br />
              Try checking your internet connection
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-y-7 grid-cols-12 py-5">
        {!loading &&
          !error &&
          barCharts?.map((chart, index) => (
            <div
              className={`w-11/12 h-72 xl:h-96 bg-gray-900 border-16 border-gray-900 ${chart.Style} rounded-2xl col-span-12 md:col-span-6 justify-self-center justify-center flex-col items-center mb-4`}
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
          ))}
      </div>

      {!error && loading && (
        <div className="grid gap-y-7 grid-cols-12 py-4">
          <div
            className={`w-11/12 h-52 xl:h-72 bg-gray-500 border-16 border-gray-500 rounded-2xl col-span-12 md:col-span-6 justify-self-center justify-center animate-pulse mb-4`}
          ></div>
          <div
            className={`w-11/12 h-52 xl:h-72 bg-gray-500 border-16 border-gray-500 rounded-2xl col-span-12 md:col-span-6 justify-self-center justify-center animate-pulse mb-4`}
          ></div>
          <div
            className={`w-11/12 h-52 xl:h-72 bg-gray-500 border-16 border-gray-500 rounded-2xl col-span-12 md:col-span-6 justify-self-center justify-center animate-pulse mb-4`}
          ></div>
          <div
            className={`w-11/12 h-52 xl:h-72 bg-gray-500 border-16 border-gray-500 rounded-2xl col-span-12 md:col-span-6 justify-self-center justify-center animate-pulse mb-4`}
          ></div>
        </div>
      )}

      <GradientOrbs classname="hidden md:block -z-10 top-0 left-1/4 w-80 h-80" />
    </section>
  );
};

export default DashboardPage;
