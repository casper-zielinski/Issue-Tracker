import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from '@db/client'


const createIssueSchema = z.object({
  Title: z.string().min(1).max(255),
  Issue: z.string().min(1),
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
    },
  });

  return NextResponse.json(newIssue, { status: 201 }); 
}
