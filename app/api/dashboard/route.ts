import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function GET(
  request: NextRequest,
) {
  const { nextUrl: { searchParams } } = request;

  const start = searchParams.get('start') || "0";
  const limit = searchParams.get('limit') || "10";

  const offset = parseInt(limit) * parseInt(start);

  let result = [];
  const results = await prisma.report.findMany({
    include: {
      user: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: parseInt(limit),
    skip:  parseInt(start)
  });
  result = results;

  return NextResponse.json({
    result: result,
    start: parseInt(start),
    hasMore: result.length >= parseInt(limit) ? true : false
  });
}