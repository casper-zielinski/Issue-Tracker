import { ErrorResponse, DataResponse } from "@/Interfaces/APIInterfaces";
import { NextRequest, NextResponse } from "next/server";
import { updateIssueSchema } from "@/lib/validations/issues";
import { createClient } from "@/lib/supabase/server";


export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  const awaitedParams = await params;
  if (!awaitedParams || !awaitedParams.id) {
    return NextResponse.json(
      {
        error: "No Id Provided",
        message: `ID is not provided, look at the type of the id and if it exists`,
      } as ErrorResponse,
      { status: 400 },
    );
  }

  // parsting to int, otherwise prisma will recognize this as a string
  const id = parseInt(awaitedParams.id.toString());

  const supabase = await createClient();

  try {
    const { data: issue, error: postgresError } = await supabase
      .from("Issue")
      .select("*")
      .eq("id", id);

    if (postgresError) {
      return NextResponse.json(
        {
          error: postgresError,
          message: "Supabase Postres Error",
        } as ErrorResponse,
        {
          status: 500,
        },
      );
    }

    if (!issue) {
      return NextResponse.json(
        {
          error: "Issue not found",
          message: "The Issue with this ID was not found",
        } as ErrorResponse,
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        data: {
          issue: issue[0],
          id: id,
        },
        message: "Successfully got issue with id",
      } as DataResponse,
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: error,
        message: `Error getting Issue with id: ${id}`,
      } as ErrorResponse,
      { status: 500 },
    );
  }
}

/**
 * patch method to edit the issues
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> },
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
        },
      );
    }

    const id = parseInt((await params).id.toString());
    const supabase = await createClient();

    const { data: editedIssue, error: postgresError } = await supabase
      .from("Issue")
      .update({
        Title: body.Title,
        Issue: body.Issue,
        Priority: body.Priority,
        Status: body.Status,
        author: body.author,
      })
      .eq("id", id)
      .select("*");

    if (postgresError) {
      return NextResponse.json(
        {
          error: postgresError,
          message: "Supabase Postres Error",
        } as ErrorResponse,
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      {
        data: {
          editedIssue: editedIssue,
          id: id,
        },
        message: "Successfully updated issue",
      } as DataResponse,
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error,
        message: "Failed to update issue",
      } as ErrorResponse,
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
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
        },
      );
    }

    const supabase = await createClient();

    const { data: deletedIssue, error: postgresError } = await supabase
      .from("Issue")
      .delete()
      .eq("id", id)
      .select("*");

    if (postgresError) {
      return NextResponse.json(
        {
          error: postgresError,
          message: "Supabase Postres Error",
        } as ErrorResponse,
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      {
        data: {
          deletedIssue: deletedIssue,
        },
        message: `Successfully deleted the Issue with the ID ${id}`,
      } as DataResponse,
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error: \n" + error,
        message: "A Error in the Delete Function of a Single Issue occured",
      } as ErrorResponse,
      { status: 500 },
    );
  }
}
