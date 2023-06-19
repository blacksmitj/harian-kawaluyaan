import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser"

export async function POST(
  request: Request
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    service,
    location,
    place,
    started,
    ended,
    eSamsat,
    canceled,
    listCanceled,
  } = body;

  Object.keys(body).forEach((value:any) =>{
    if (!body[value]) {
      NextResponse.error()
    }
  })

  const report = await prisma.report.create({
    data: {
      service,
      location,
      place,
      started: parseInt(started, 10),
      ended: parseInt(ended, 10),
      eSamsat,
      canceled,
      listCanceled: JSON.stringify(listCanceled),
      userId: currentUser.id
    }
  })

  return NextResponse.json(report)
}

export async function GET(
  request: NextRequest,
) {
  const currentUser = await getCurrentUser();
  const { nextUrl: { searchParams } } = request;

  const keyword = searchParams.get('keyword') || "";
  const page = searchParams.get('page') || "0";
  const limit = searchParams.get('limit') || "10";

  const offset = parseInt(limit) * parseInt(page);

  const totalRows = await prisma.report.count({
    where: {
      userId: currentUser?.id,
      OR: [
        {service: {
          contains: keyword,
          mode: 'insensitive'
        }},
        {place: {
          contains: keyword,
          mode: 'insensitive'
        }},
        {location: {
          contains: keyword,
          mode: 'insensitive'
        }},
      ]
    },
  });

  const totalPage = Math.ceil(totalRows/parseInt(limit));

  const result = await prisma.report.findMany({
    where: {
      userId: currentUser?.id,
      OR: [
        {service: {
          contains: keyword,
          mode: 'insensitive'
        }},
        {place: {
          contains: keyword,
          mode: 'insensitive'
        }},
        {location: {
          contains: keyword,
          mode: 'insensitive'
        }},
      ]
    },
    include: {
      user: true
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