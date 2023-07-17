import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  userId?: string
}

export async function PUT(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { userId } = params;

   const user = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      image: ""
    }
  })

  return NextResponse.json(user)
}