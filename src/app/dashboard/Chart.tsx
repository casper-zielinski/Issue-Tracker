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
import React from "react";
import { BarCharts } from "./types";

const Chart = ({chartData} : {chartData: BarCharts}) => {
  return (
    <ResponsiveContainer className={"w-full"} width="100%" height="80%">
      <BarChart data={chartData?.amounts} title={chartData.title}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Status" className={styles.barText} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill={chartData.Color} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
