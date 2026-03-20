"use client";

import { TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import GradientOrbs from "@/app/components/GradientOrbs";
import { NewIssue } from "@/Interfaces/APIInterfaces";
import { createIssueSchema } from "@/lib/validations/issues";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center">
      <div className="bg-gray-500 animate-pulse w-10/12 h-100 rounded"></div>
    </div>
  ),
});

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<NewIssue>({
    defaultValues: {
      Priority: "MEDIUM",
    },
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [textShower, setTextShower] = useState(true);
  const userId = useSelector((state: RootState) => state.userState.id);

  async function postToApi(issueForm: NewIssue) {
    try {
      const validation = createIssueSchema.safeParse({
        ...issueForm,
        author: userId,
      } as NewIssue);
      if (!validation.success) {
        setError("Invalid Data Provided");
        return;
      }
      await axios.post("/api/issues", {
        ...issueForm,
        author: userId,
      });
      router.push("/Issues");
    } catch {
      setError("An Error Occurred");
    }
  }

  return (
    <div className="min-h-screen">
      {error && (
        <div className="col-span-12 grid grid-cols-3 grid-flow-col md:justify-center p-3 scrollbar-hide">
          <div
            role="alert"
            className="alert alert-error col-span-3 md:col-span-1"
          >
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
            <span className="md:text-base">Error! Could not load issues</span>
            <button
              className="btn btn-sm md:btn-md btn-neutral rounded-2xl"
              onClick={() => setError("")}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <form
        className="grid grid-cols-12 gap-4 p-3"
        onSubmit={handleSubmit((data) => {
          postToApi(data);
        })}
      >
        <div className="col-span-12 flex justify-center">
          <TextField.Root
            placeholder="Title"
            {...register("Title")}
            className="border-2 w-4/5 lg:w-2/3 focus-within:shadow-lg"
            size={"3"}
          ></TextField.Root>
        </div>

        <Controller
          name="Priority"
          control={control}
          render={({ field }) => (
            <div className="dropdown dropdown-start col-span-2">
              <div tabIndex={0} role="button" className="btn m-1">
                {textShower ? "Priority" : field.value}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-36 p-2 shadow-sm text-black dark:text-white"
              >
                <li>
                  <a
                    className={
                      priority === "LOW"
                        ? "bg-green-600 text-black font-bold"
                        : ""
                    }
                    onClick={() => {
                      setPriority("LOW");
                      setTextShower(false);
                      field.onChange("LOW");
                    }}
                  >
                    Low
                  </a>
                </li>
                <li>
                  <a
                    className={
                      priority === "MEDIUM"
                        ? "bg-blue-600 text-black font-bold"
                        : ""
                    }
                    onClick={() => {
                      setPriority("MEDIUM");
                      setTextShower(false);
                      field.onChange("MEDIUM");
                    }}
                  >
                    Medium
                  </a>
                </li>
                <li>
                  <a
                    className={
                      priority === "HIGH"
                        ? "bg-orange-600 text-black font-bold"
                        : ""
                    }
                    onClick={() => {
                      setPriority("HIGH");
                      setTextShower(false);
                      field.onChange("HIGH");
                    }}
                  >
                    High
                  </a>
                </li>
                <li>
                  <a
                    className={
                      priority === "URGENT"
                        ? "bg-red-600 text-black font-bold"
                        : ""
                    }
                    onClick={() => {
                      setPriority("URGENT");
                      setTextShower(false);
                      field.onChange("URGENT");
                    }}
                  >
                    Urgent
                  </a>
                </li>
              </ul>
            </div>
          )}
        />

        <div className="col-span-12 my-2">
          <Controller
            name="Issue"
            control={control}
            render={({ field }) => (
              <div className="rounded transition-all min-h-[50vh] h-40 md:h-56 lg:h-80">
                <SimpleMDE
                  placeholder="Issue"
                  className="bg-sky-700 rounded w-1/1 md:w-6/7 m-4 focus-within:shadow-2xl text-black justify-self-center"
                  {...field}
                />
              </div>
            )}
          />
        </div>

        <div className="col-span-12 flex justify-center">
          <button
            className="font-bold btn btn-primary btn-md my-4"
            type="submit"
          >
            Submit New Issue
          </button>
        </div>
      </form>
      <GradientOrbs classname="hidden md:block top-14 left-14 h-96 w-96 -z-10" />
      <GradientOrbs classname="hidden md:block bottom-14 right-14 h-96 w-96 -z-10" />
    </div>
  );
};

export default NewIssuePage;
