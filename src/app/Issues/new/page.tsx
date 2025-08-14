"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { $Enums } from "@/generated/prisma";

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
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  const [error, setError] = useState("");
  const [priority, setPriority] = useState(33);

  const rangeColor = (range: number) => {
    switch (range) {
      case 0:
        return "success";
      case 33:
        return "primary";
      case 66:
        return "warning";
      case 99:
        return "error";
    }
  };

  async function postToApi(data: IssueForm) {
    try {
      await axios.post("/api/issues", data);
      router.push("/Issues");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("An Error Occurred");
    }
  }

  return (
    <>
      {error && (
        <div className="flex flex-col space-y-1 items-center p-3">
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
        className="flex flex-col space-y-3 p-3 items-center"
        onSubmit={handleSubmit((data) => {
          postToApi(data);
        })}
      >
        <div className="w-1/2 min-w-3xs lg:w-2/3 focus-within:shadow-lg">
          <TextField.Root
            placeholder="Title"
            {...register("Title")}
            className="border-2"
          ></TextField.Root>
        </div>
        <Controller
          name="Issue"
          control={control}
          render={({ field }) => (
            <div className="w-1/2 min-w-3xs lg:w-2/3 focus-within:shadow-lg rounded transition-all">
              <SimpleMDE
                placeholder="Issue"
                className="bg-sky-700 rounded border-2 focus-within:shadow-2xl"
                {...field}
              />
            </div>
          )}
        />
        <Button className="font-bold font-mono" type="submit">
          Submit New Issue
        </Button>
        <div className="w-full max-w-xs mt-4">
          <input
            type="range"
            min={0}
            max={100}
            value={priority}
            className={`range range-${rangeColor(
              priority
            )} md:range-lg lg:range-xl`}
            step={33}
            onChange={(input) => setPriority(parseInt(input.target.value))}
          />
          <div className="flex justify-between px-2.5 mt-2 text-xs">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
          <div className="flex justify-between px-2.5 mt-2 text-xs">
            <span className={priority === 0 ? "font-bold" : ""}>Low</span>
            <span className={priority === 33 ? "font-bold" : ""}>Medium</span>
            <span className={priority === 66 ? "font-bold" : ""}>High</span>
            <span className={priority === 99 ? "font-bold" : ""}>Urgent</span>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewIssuePage;
