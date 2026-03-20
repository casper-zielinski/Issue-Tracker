import { z } from "zod";
import { PriorityArray, StatusArray } from "@/Constants/PriorityStatus";

export const PriorityEnum = z.enum(PriorityArray);
export const StatusEnum = z.enum(StatusArray);

export const createIssueSchema = z.object({
  Title: z.string().min(1, "Title is required").max(255),
  Issue: z.string().min(1, "Describtion is required"),
  Priority: PriorityEnum.default("MEDIUM"),
  author: z.string().optional().nullable(),
});

export const updateIssueSchema = z.object({
  Title: z.string().min(1, "Title is required").max(255).optional(),
  Issue: z.string().min(1, "Describtion is required").optional(),
  Priority: PriorityEnum.default("MEDIUM").optional(),
  Status: StatusEnum.default("OPEN").optional(),
  author: z.string().optional().nullable(),
});
