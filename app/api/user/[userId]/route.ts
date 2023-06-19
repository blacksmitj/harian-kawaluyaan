import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  userId?: string
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {

  const { userId } = params;

  if (!userId || typeof userId !== 'string') {
    throw new Error("User Id tidak ditemukan!")
  }

  const user = await prisma.user.delete({
    where: {
      id: userId,
    }
  });

  return NextResponse.json(user);
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

  const body = await request.json();
  const {
    name,
    image,
  } = body;

  Object.keys(body).forEach((value:any) =>{
    if (!body[value]) {
      NextResponse.error()
    }
  })

  const user = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      name,
      image
    }
  })

  return NextResponse.json(user)
}