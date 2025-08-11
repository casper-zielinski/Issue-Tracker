import styles from "./BarCharts.module.css";

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

type issue =
  | lowPriorityIssue
  | mediumPriorityIssue
  | hightPriorityIssue
  | urgentPriorityIssue;

const data: issues = {
  lowPriorityIssues: [
    {
      amount: 0,
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
      amount: 7,
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
      amount: 1,
      status: status.IN_PROGRESS,
    },
    {
      amount: 4,
      status: status.CLOSED,
    },
  ],
};

export type Chart = {
  Style: string;
  Data: issue[];
  Title: string;
  Color: string;
  TotalAmount: number;
};

export const barCharts: Chart[] = [
  {
    Style: styles.barShadowBlue,
    Data: data.mediumPriorityIssues,
    Title: "Medium Priority",
    Color: "#8884d8",
    TotalAmount: data.mediumPriorityIssues.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
    ),
  },
  {
    Style: styles.barShadowOrange,
    Data: data.highPriorityIssues,
    Title: "High Priority",
    Color: "#EB970C",
    TotalAmount: data.highPriorityIssues.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
    ),
  },
  {
    Style: styles.barShadowRed,
    Data: data.urgentPriorityIssues,
    Title: "Urgent Priority",
    Color: "#EB130C",
    TotalAmount: data.urgentPriorityIssues.reduce(
      (accumulater, currentValue) => accumulater + currentValue.amount,
      0
    ),
  },
  {
    Style: styles.barShadowGreen,
    Data: data.lowPriorityIssues,
    Title: "Low Priority",
    Color: "#82ca9d",
    TotalAmount: data.lowPriorityIssues.reduce(
      (accumulater, currentValue) => accumulater + currentValue.amount,
      0
    ),
  },
];

export const barChartsPriority: Chart[] = [
  {
    Style: styles.barShadowGreen,
    Data: data.lowPriorityIssues,
    Title: "Low Priority",
    Color: "#82ca9d",
    TotalAmount: data.lowPriorityIssues.reduce(
      (accumulater, currentValue) => accumulater + currentValue.amount,
      0
    ),
  },
  {
    Style: styles.barShadowBlue,
    Data: data.mediumPriorityIssues,
    Title: "Medium Priority",
    Color: "#8884d8",
    TotalAmount: data.mediumPriorityIssues.reduce(
      (accumulater, currentValue) => accumulater + currentValue.amount,
      0
    ),
  },
  {
    Style: styles.barShadowOrange,
    Data: data.highPriorityIssues,
    Title: "High Priority",
    Color: "#EB970C",
    TotalAmount: data.highPriorityIssues.reduce(
      (accumulater, currentValue) => accumulater + currentValue.amount,
      0
    ),
  },
  {
    Style: styles.barShadowRed,
    Data: data.urgentPriorityIssues,
    Title: "Urgent Priority",
    Color: "#EB130C",
    TotalAmount: data.urgentPriorityIssues.reduce(
      (accumulater, currentValue) => accumulater + currentValue.amount,
      0
    ),
  },
];
