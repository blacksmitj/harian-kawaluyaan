import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
) {
  const { nextUrl: { searchParams } } = request;

  const keyword = searchParams.get('keyword') || "";
  const page = searchParams.get('page') || "0";
  const limit = searchParams.get('limit') || "10";

  const offset = parseInt(limit) * parseInt(page);

  const totalRows = await prisma.user.count({
    where: {
      OR: [
        {name: {
          contains: keyword,
          mode: 'insensitive'
        }},
        {email: {
          contains: keyword,
          mode: 'insensitive'
        }},
      ]
    },
  });

  const totalPage = Math.ceil(totalRows/parseInt(limit));

  const result = await prisma.user.findMany({
    where: {
      OR: [
        {name: {
          contains: keyword,
          mode: 'insensitive'
        }},
        {email: {
          contains: keyword,
          mode: 'insensitive'
        }},
      ]
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: parseInt(limit),
    skip: offset
  });

  

  return NextResponse.json({
    result,
    page: parseInt(page),
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
}