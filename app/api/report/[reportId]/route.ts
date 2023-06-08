import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  reportId?: string
}

export async function PUT(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reportId } = params;

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

  const report = await prisma.report.update({
    where: {
      id: reportId
    },
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