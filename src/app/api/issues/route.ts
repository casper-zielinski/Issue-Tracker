import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@db/client";
import { DataResponse, ErrorResponse } from "@/Interfaces/APIInterfaces";
import { PriorityArray } from "@/Constants/PriorityStatus";

export const PriorityEnum = z.enum(PriorityArray);

const createIssueSchema = z.object({
  Title: z.string().min(1, "Title is required").max(255),
  Issue: z.string().min(1, "Describtion is required"),
  Priority: PriorityEnum.default("MEDIUM"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        {
          error: validation.error,
          message: validation.error.message,
        } as ErrorResponse,
        { status: 400 }
      );

    const newIssue = await prisma.issue.create({
      data: {
        Title: body.Title,
        Issue: body.Issue,
        Priority: body.Priority,
      },
    });

    return NextResponse.json(
      {
        data: { newIssue: newIssue },
        message: "Successfully posted new Issue",
      } as DataResponse,
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
        status: 500,
        message: "Failed to post new Issue",
      } as ErrorResponse,
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const issues = await prisma.issue.findMany();
    return NextResponse.json(
      {
        data: { issues: issues },
        message: "Successfully fetched data",
      } as DataResponse,
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error fetching data: ", error);
    return NextResponse.json(
      {
        error: error,
        status: 500,
        message: "Failed to fetch Issues",
      } as ErrorResponse,
      { status: 500 }
    );
  }
}
