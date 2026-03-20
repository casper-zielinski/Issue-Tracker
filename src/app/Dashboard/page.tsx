"use server";

import GradientOrbs from "../components/GradientOrbs";
import { DashboardIcon } from "@radix-ui/react-icons";
import Chart from "../Dashboard/Chart";
import { getBarChartsFromIssues } from "@/app/Dashboard/getBarCharts";
import { BarCharts, Issue } from "../Dashboard/types";
import { PlaceholderBarCharts } from "@/Constants/PlaceHolderCharts";
import { createClient } from "@/lib/supabase/server";

const DashboardPage = async () => {
  let error = false;
  const getBarChartDataFromServer = async () => {
    try {
      const supabase = await createClient();
      const issues = (await supabase.from("Issue").select("*")).data as Issue[];
      return getBarChartsFromIssues(issues);
    } catch (err) {
      console.error(err);
      error = true;
      return;
    }
  };

  const barCharts: BarCharts[] =
    (await getBarChartDataFromServer()) || PlaceholderBarCharts;

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
          {/* <SortButton
            DefaultBarChart={defaultBarChart || barCharts}
            setBarChart={setBarCharts}
          /> */}
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
        {!error &&
          barCharts?.map((chart, index) => (
            <div
              className={`w-full md:w-11/12 h-72 xl:h-96 bg-gray-900 border-16 border-gray-900 ${chart.Style} rounded-2xl col-span-12 md:col-span-6 justify-self-center justify-center flex-col items-center mb-4`}
              key={index}
            >
              <>
                <h2 className="font-bold grid grid-cols-2 text-sm sm:text-base mb-3">
                  <span className="text-start">{chart.title}</span>
                  <div className="text-end">
                    Total Amount of Issues: {chart.totalamount}
                  </div>
                </h2>
                <Chart chartData={chart} />
              </>
            </div>
          ))}
      </div>

      <GradientOrbs classname="hidden md:block -z-10 top-0 left-1/4 w-80 h-80" />
    </section>
  );
};

export default DashboardPage;
