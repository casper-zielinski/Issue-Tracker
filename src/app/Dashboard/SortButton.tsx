import React, { Dispatch, SetStateAction } from "react";
import { Chart } from "./types";
import { Button } from "@radix-ui/themes/src/index.js";

const SortButton = () => {
  return (
    <div className="col-span-12">
      <div className="dropdown dropdown-start ms-5">
        <div tabIndex={0} role="button" className="btn m-1">
          Sort
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <div className="dropdown dropdown-right">
              <div tabIndex={0} role="button" className="m-1">
                By Priority
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a>⬇️</a>
                </li>
                <li>
                  <a>⬆️</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="dropdown dropdown-right">
              <div tabIndex={0} role="button" className="m-1">
                By Totalamounts
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a>⬇️</a>
                </li>
                <li>
                  <a>⬆️</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a>Default</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SortButton;
