"use client";

import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-300 animate-pulse w-1/1 h-100 rounded" />
  ),
});

interface IssueForm {
  Title: string;
  Issue: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  async function postToApi(data: IssueForm) {
    await axios.post("/api/issues", data);
    router.push("/Dashboard");
  }

  return (
    <form
      className="flex flex-col space-y-3 justify-center-safe p-3 items-center"
      onSubmit={handleSubmit((data) => {
        postToApi(data)
      })}
    >
      <TextField.Root
        placeholder="Title"
        className="w-1/2 min-w-3xs lg:w-2/3"
        {...register("Title")}
      ></TextField.Root>
      <Controller
        name="Issue"
        control={control}
        render={({ field }) => (
          <div className="w-1/2 min-w-3xs lg:w-2/3">
            <SimpleMDE
              placeholder="Issue"
              className="bg-sky-700 rounded"
              {...field}
            />
          </div>
        )}
      />
      <Button className="font-bold font-mono" type="submit">
        Submit New Issue
      </Button>
    </form>
  );
};

export default NewIssuePage;
