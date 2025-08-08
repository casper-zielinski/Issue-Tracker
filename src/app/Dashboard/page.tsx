"use client";

import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import styles from "./BarText.module.css";

const DashboardPage = () => {
  enum status {
    OPEN = "open",
    CLOSED = "closed",
    IN_PROGRESS = "in progress",
  }

  interface lowPriorityIssue {
    amount: number;
    status: status;
  }

  interface mediumPriorityIssue {
    amount: number;
    status: status;
  }

  interface hightPriorityIssue {
    amount: number;
    status: status;
  }

  interface urgentPriorityIssue {
    amount: number;
    status: status;
  }

  interface issues {
    lowPriorityIssues: lowPriorityIssue[];
    mediumPriorityIssues: mediumPriorityIssue[];
    highPriorityIssues: hightPriorityIssue[];
    urgentPriorityIssues: urgentPriorityIssue[];
  }

  const data: issues = {
    lowPriorityIssues: [
      {
        amount: 2,
        status: status.OPEN,
      },
      {
        amount: 3,
        status: status.IN_PROGRESS,
      },
      {
        amount: 4,
        status: status.CLOSED,
      },
    ],
    highPriorityIssues: [
      {
        amount: 2,
        status: status.OPEN,
      },
      {
        amount: 3,
        status: status.IN_PROGRESS,
      },
      {
        amount: 4,
        status: status.CLOSED,
      },
    ],
    mediumPriorityIssues: [
      {
        amount: 2,
        status: status.OPEN,
      },
      {
        amount: 3,
        status: status.IN_PROGRESS,
      },
      {
        amount: 4,
        status: status.CLOSED,
      },
    ],
    urgentPriorityIssues: [
      {
        amount: 2,
        status: status.OPEN,
      },
      {
        amount: 3,
        status: status.IN_PROGRESS,
      },
      {
        amount: 4,
        status: status.CLOSED,
      },
    ],
  };

  return (
    <div className="flex flex-col space-y-5 items-center mt-3">
      <h2>Medium Priority</h2>
      <div className="w-11/12 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.mediumPriorityIssues} title="Medium Priority">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" className={styles.barText} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <h2>High Priority</h2>
      <div className="w-11/12 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.highPriorityIssues} title="Medium Priority">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" className={styles.barText} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#EB970C" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <h2>Urgent Priority</h2>
      <div className="w-11/12 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.urgentPriorityIssues} title="Medium Priority">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" className={styles.barText} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#EB130C" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <h2>Low Priority</h2>
      <div className="w-11/12 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.highPriorityIssues} title="Medium Priority">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" className={styles.barText} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
