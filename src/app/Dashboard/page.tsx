"use client";

import React, { useState } from "react";
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
import { barCharts, barChartsPriority } from "./types";

const DashboardPage = () => {
  const [barChartCharts, setBarChartCharts] = useState(barCharts);

  return (
    <div className="grid gap-x-3 gap-y-4 grid-cols-12 mt-10 mb-5">
      <h1 className="col-span-12 text-3xl font-bold text-center">Dashboard</h1>

      <div className="dropdown dropdown-hover col-span-12 ms-5">
        <div tabIndex={0} role="button" className="btn">
          Hover
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="m-1">
                Sort after Priority
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a
                    onClick={() =>
                      setBarChartCharts([...barChartsPriority].reverse())
                    }
                  >
                    ↑
                  </a>
                </li>
                <li>
                  <a onClick={() => setBarChartCharts(barChartsPriority)}>↓</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="m-1">
                Sort after Total Amount of Issues
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a
                    onClick={() =>
                      setBarChartCharts((prev) =>
                        [...prev].sort((a, b) => a.TotalAmount - b.TotalAmount)
                      )
                    }
                  >
                    ↑
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      setBarChartCharts((prev) =>
                        [...prev].sort((a, b) => b.TotalAmount - a.TotalAmount)
                      )
                    }
                  >
                    ↓
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a onClick={() => setBarChartCharts(barCharts)}>Default</a>
          </li>
        </ul>
      </div>
      {barChartCharts.map((chart, index) => (
        <div
          className={`w-11/12 h-52 bg-black border-16 border-black ${chart.Style} rounded-2xl col-span-12 md:col-span-6 justify-self-center`}
          key={index + chart.Title + chart.TotalAmount}
        >
          <h2 className="font-bold grid grid-cols-2">
            <span className="text-start">{chart.Title}</span>
            <span className="text-end hidden md:block">{`Total Amount of Issues: ${chart.TotalAmount}`}</span>
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chart.Data} title={chart.Title}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" className={styles.barText} />
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
