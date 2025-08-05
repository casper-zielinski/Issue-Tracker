'use client'

import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="flex flex-col space-y-3 justify-center-safe p-3 items-center">
      <TextField.Root placeholder="Title" className="w-1/2 min-w-3xs">
      </TextField.Root>
      <TextArea placeholder="Your Issue..." className="w-1/2 min-w-3xs"/>
      <Button className="font-bold font-mono">Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
