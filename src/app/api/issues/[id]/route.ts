import { ErrorResponse, DataResponse } from "@/Interfaces/APIInterfaces";
import prisma from "@db/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { PriorityEnum } from "../route";
import { Issue, Prisma } from "@/generated/prisma";
import { StatusArray } from "@/Constants/PriorityStatus";

const StatusEnum = z.enum(StatusArray);

const updateIssueSchema = z.object({
  Title: z.string().min(1, "Title is required").max(255).optional(),
  Issue: z.string().min(1, "Describtion is required").optional(),
  Priority: PriorityEnum.default("MEDIUM").optional(),
  Status: StatusEnum.default("OPEN").optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  const id = parseInt((await params).id.toString());

  if (!id) {
    return NextResponse.json(
      {
        error: "No Id Provided",
        message: `ID is not provided, look at the type of the id and if it exists`,
      } as ErrorResponse,
      { status: 400 }
    );
  }

  try {
    const issue: Issue | null = await prisma.issue.findUnique({
      where: { id: id },
    });

    if (!issue) {
      return NextResponse.json(
        {
          error: "Issue not found",
          message: "The Issue with this ID was not found",
        } as ErrorResponse,
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        data: {
          issue: issue,
          id: id,
        },
        message: "Successfully got issue with id",
      } as DataResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: error,
        message: `Error getting Issue with id: ${id}`,
      } as ErrorResponse,
      { status: 500 }
    );
  }
}

/**
 * patch method to edit the issues
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const body = await request.json();
    const validation = updateIssueSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: validation.error,
          message: validation.error.message,
        } as ErrorResponse,
        {
          status: 401,
        }
      );
    }

    const id = parseInt((await params).id.toString());

    const editedIssue = await prisma.issue.update({
      where: {
        id: id,
      },
      data: {
        Title: body.Title,
        Issue: body.Issue,
        Priority: body.Priority,
        Status: body.Status,
        author: null,
      },
    });

    return NextResponse.json(
      {
        data: {
          editedIssue: editedIssue,
          id: id,
        },
        message: "Successfully updated issue",
      } as DataResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json(
        { error: error.cause, message: error.message } as ErrorResponse,
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: error,
          message: "Failed to update issue",
        } as ErrorResponse,
        {
          status: 500,
        }
      );
    }
  }
}

export async function DELETE({ params }: { params: Promise<{ id: number }> }) {
  try {
    const id = (await params).id;

    if (!id) {
      return NextResponse.json(
        {
          error: "Id not found",
          message:
            "the issue to delete was not found, either it was deleted or it did not exist in the first place",
        } as ErrorResponse,
        {
          status: 404,
        }
      );
    }

    const deletedIssue = await prisma.issue.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      {
        data: {
          deletedIssue: deletedIssue,
        },
        message: `Successfully deleted the Issue with the ID ${id}`,
      } as DataResponse,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error: \n" + error,
        message: "A Error in the Delete Function of a Single Issue occured",
      } as ErrorResponse,
      { status: 500 }
    );
  }
}
