import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@db/client";
import { DataResponse, ErrorResponse } from "@/Interfaces/APIInterfaces";

const PriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);
const StatusEnum = z.enum(["OPEN", "CLOSED", "IN PROGRESS"]);

const createIssueSchema = z.object({
  Title: z.string().min(1, "Title is required").max(255),
  Issue: z.string().min(1, "Describtion is required"),
  Priority: PriorityEnum.default("MEDIUM"),
});

const updateIssueSchema = z.object({
  id: z.number().positive().min(1),
  Title: z.string().min(1, "Title is required").max(255).optional(),
  Issue: z.string().min(1, "Describtion is required").optional(),
  Priority: PriorityEnum.default("MEDIUM").optional(),
  Status: StatusEnum.default("OPEN").optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json({
        error: validation.error,
        status: 400,
        message: validation.error.message,
      } as ErrorResponse);

    const newIssue = await prisma.issue.create({
      data: {
        Title: body.Title,
        Issue: body.Issue,
        Priority: body.Priority,
      },
    });

    return NextResponse.json({
      data: { newIssue: newIssue },
      status: 201,
      message: "Successfully posted new Issue",
    } as DataResponse);
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
    return NextResponse.json({
      data: { issues: issues },
      message: "Successfully fetched data",
      status: 200,
    } as DataResponse);
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

/**
 * patch method to edit the issues
 */
// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: number }> }
// ) {
//   try {
//     const body = await request.json();
//     const validation = updateIssueSchema.safeParse(body);
//     if (!validation.success) {
//       return NextResponse.json({
//         error: validation.error,
//         message: validation.error.message,
//         status: 401,
//       } as ErrorResponse);
//     }

//     const id = (await params).id;

//     prisma.issue.updateMany({
//       where: {},
//     });

//     return NextResponse.json({
//       data: {
//         body: body,
//         id: id,
//       },
//       message: "Successfully updated issue",
//     } as DataResponse);
//   } catch (error) {
//     return NextResponse.json({
//       error: error,
//       status: 500,
//       message: "Failed to update issue",
//     } as ErrorResponse);
//   }
// }
