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
import { barCharts } from "./types";

const DashboardPage = () => {
  
 const [barChartCharts, setBarChartCharts] =  useState(barCharts);

  return (
    <div className="grid gap-x-7 gap-y-10 grid-cols-12 mt-10 mb-10">
      {barCharts.map((chart, index) => (
        <div
          className={`w-11/12 h-48 bg-black border-16 border-black ${chart.Style} rounded-2xl col-span-12 md:col-span-6 justify-self-center`}
          key={index}
        >
          <h2 className="font-bold ">{chart.Title}</h2>
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
