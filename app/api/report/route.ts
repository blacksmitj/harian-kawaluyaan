import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser"
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear
} from "date-fns";

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
  const { searchParams } = new URL(request.url);

  const keyword = searchParams.get('keyword') || "";
  const page = searchParams.get('page') || "0";
  const limit = searchParams.get('limit') || "10";
  const range = searchParams.get('range');

  const today = new Date();
  let start = startOfDay(today)
  let end = endOfDay(today);

  if (range === "day") {
    start = startOfDay(today);
    end = endOfDay(today);
  }
  if (range === "week") {
    start = startOfWeek(today);
    end = endOfWeek(today);
  }
  if (range === "month") {
    start = startOfMonth(today);
    end = endOfMonth(today);
  }
  if (range === "year") {
    start = startOfYear(today);
    end = endOfYear(today);
  }

  const offset = parseInt(limit) * parseInt(page);

  const totalRows = await prisma.report.count({
    where: {
      userId: currentUser?.id,
      createdAt: {
        lte: range !== "all" ? end : undefined,
        gte: range !== "all" ? start : undefined,
      },
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
        }}
      ]
    },
  });

  let allRessult = {};

  if (keyword !== "" || range !== "all") {
    allRessult = await prisma.report.findMany({
      where: {
        userId: currentUser?.id,
        createdAt: {
          lte: range !== "all" ? end : undefined,
          gte: range !== "all" ? start : undefined,
        },
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
          }}
        ]
      },
    });
  }

  const totalPage = Math.ceil(totalRows/parseInt(limit));

  const result = await prisma.report.findMany({
    where: {
      userId: currentUser?.id,
      createdAt: {
        lte: range !== "all" ? end : undefined,
        gte: range !== "all" ? start : undefined,
      },
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
        }}
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
    limit,
    totalRows,
    totalPage,
    counts: allRessult
  });
}