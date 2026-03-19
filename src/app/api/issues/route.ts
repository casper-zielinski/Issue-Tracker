import { NextRequest, NextResponse } from "next/server";
import prisma from "@db/client";
import { DataResponse, ErrorResponse, NewIssue } from "@/Interfaces/APIInterfaces";
import { createIssueSchema } from "@/lib/validations/issues";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);
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
        author: body.author,
      } as NewIssue,
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

export async function GET(request: NextRequest) {
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
