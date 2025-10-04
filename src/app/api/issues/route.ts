import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@db/client";

const PriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);

const createIssueSchema = z.object({
  Title: z.string().min(1, "Title is required").max(255),
  Issue: z.string().min(1, "Describtion is required"),
  Priority: PriorityEnum.default("MEDIUM"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.message, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      Title: body.Title,
      Issue: body.Issue,
      Priority: body.Priority,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(request: NextRequest) {
  try {
    const issues = await prisma.issue.findMany();
    return NextResponse.json(issues);
  } catch (error) {
    console.log("Error fetching data: ", error);
    return NextResponse.json(
      { error: "Failed to fetch issue" },
      { status: 500 }
    );
  }
}
