import React, { Dispatch, SetStateAction } from "react";
import {  barChartsPriority, Chart } from "./types";

interface SortButtonProps {
  barChartsProp: Chart[];
  setBarCharts: Dispatch<SetStateAction<Chart[]>>;
}

const SortButton = ({
  barChartsProp: barCharts,
  setBarCharts,
}: SortButtonProps) => {
  return (
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
                  onClick={() => setBarCharts([...barChartsPriority].reverse())}
                >
                  ↑
                </a>
              </li>
              <li>
                <a onClick={() => setBarCharts(barChartsPriority)}>↓</a>
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
                    setBarCharts((prev) =>
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
                    setBarCharts((prev) =>
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
          <a onClick={() => setBarCharts(barCharts)}>Default</a>
        </li>
      </ul>
    </div>
  );
};

export default SortButton;
