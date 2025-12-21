import { Filter, ArrowDown, ArrowUp } from "lucide-react";
import { BarCharts } from "./types";
import { Dispatch, SetStateAction } from "react";

interface SortButtonProps {
  DefaultBarChart: BarCharts[];
  setBarChart: Dispatch<SetStateAction<BarCharts[]>>;
}

const SortButton = ({ setBarChart, DefaultBarChart }: SortButtonProps) => {
  return (
    <div className="col-span-12">
      <div className="dropdown dropdown-start ms-5">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 text-white bg-zinc-950"
        >
          <span className="me-3">Sort</span>
          <Filter />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-zinc-900 rounded-box z-1 w-44 p-2 shadow-sm"
        >
          <li>
            <div className="dropdown dropdown-right">
              <div tabIndex={0} role="button" className="m-1 text-white">
                By Priority
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-zinc-900 rounded-box z-1 w-20 p-1 shadow-sm"
              >
                <li>
                  <a
                    onClick={() => {
                      setBarChart([...DefaultBarChart]);
                    }}
                  >
                    <ArrowDown className="text-white" />
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      setBarChart([...DefaultBarChart].reverse());
                    }}
                  >
                    <ArrowUp className="text-white" />
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="dropdown dropdown-right">
              <div tabIndex={0} role="button" className="m-1 text-white">
                By Totalamounts
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-zinc-900 rounded-box z-1 w-20 p-2 shadow-sm"
              >
                <li>
                  <a
                    onClick={() => {
                      setBarChart((prev) =>
                        [...prev].sort((a, b) => a.totalamount - b.totalamount)
                      );
                    }}
                  >
                    <ArrowDown className="text-white" />
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      setBarChart((prev) =>
                        [...prev].sort((a, b) => b.totalamount - a.totalamount)
                      )
                    }
                  >
                    <ArrowUp className="text-white" />
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a
              onClick={() => setBarChart(DefaultBarChart)}
              className="m-1 text-white"
            >
              Default
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SortButton;
