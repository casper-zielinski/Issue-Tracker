"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { $Enums, Priority, Status } from "@/generated/prisma";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-300 animate-pulse w-1/1 h-100 rounded" />
  ),
});

interface IssueForm {
  Title: string;
  Issue: string;
  Priority: $Enums.Priority;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>({
    defaultValues: {
      Priority: "MEDIUM",
    },
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [textShower, setTextShower] = useState(true);

  async function postToApi(data: IssueForm) {
    try {
      await axios.post("/api/issues", data);
      router.push("/Issues");
    } catch {
      setError("An Error Occurred");
    }
  }

  return (
    <>
      {error && (
        <div className="flex flex-col space-y-1 items-center mt-3">
          <Callout.Root
            size="2"
            color="red"
            className="w-1/2 min-w-3xs lg:w-2/3 border-2"
          >
            <Callout.Icon>
              <ExclamationTriangleIcon />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
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
            className="border-2 w-4/5 min-w-4xs lg:w-2/3 focus-within:shadow-lg"
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
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-36 p-2 shadow-sm"
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
                      field.onChange(Priority.LOW);
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
                      field.onChange(Priority.MEDIUM);
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
                      field.onChange(Priority.HIGH);
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
                      field.onChange(Priority.URGENT);
                    }}
                  >
                    Urgent
                  </a>
                </li>
              </ul>
            </div>
          )}
        />

        <div className="col-span-12">
          <Controller
            name="Issue"
            control={control}
            render={({ field }) => (
              <div className="rounded transition-all">
                <SimpleMDE
                  placeholder="Issue"
                  className="bg-sky-700 rounded border-2 w-1/1 md:w-6/7 focus-within:shadow-2xl text-black justify-self-center"
                  {...field}
                />
              </div>
            )}
          />
        </div>

        <div className="col-span-12 flex justify-center">
          <button className="font-bold btn btn-primary btn-md" type="submit">
            Submit New Issue
          </button>
        </div>
      </form>
    </>
  );
};

export default NewIssuePage;
