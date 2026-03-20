import { NextRequest, NextResponse } from "next/server";
import {
  DataResponse,
  ErrorResponse,
  NewIssue,
} from "@/Interfaces/APIInterfaces";
import { createIssueSchema } from "@/lib/validations/issues";
import { createClient } from "@/lib/supabase/server";

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
        { status: 400 },
      );

    const newIssue = {
      Title: body.Title,
      Issue: body.Issue,
      Priority: body.Priority,
      author: body.author,
    } as NewIssue;

    const supabase = await createClient();
    const { error: postgresError } = await supabase
      .from("Issue")
      .insert(newIssue);

    if (postgresError) {
      return NextResponse.json(
        {
          error: postgresError,
          message: "Supabase Postgres Error",
          errorDetails: postgresError.details,
        } as ErrorResponse,
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      {
        data: { newIssue: newIssue },
        message: "Successfully posted new Issue",
      } as DataResponse,
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: error,
        status: 500,
        message: "Failed to post new Issue",
      } as ErrorResponse,
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: issues,
      error: postgresError,
      count,
    } = await supabase.from("Issue").select("*");

    if (postgresError) {
      return NextResponse.json({
        error: postgresError,
        message: "Supabase Postgres Error",
      } as ErrorResponse);
    }

    return NextResponse.json(
      {
        data: { issues: issues, count: count },
        message: "Successfully fetched data",
      } as DataResponse,
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error fetching data: ", error);
    return NextResponse.json(
      {
        error: error,
        status: 500,
        message: "Failed to fetch Issues",
      } as ErrorResponse,
      { status: 500 },
    );
  }
}
