import bcrypt from "bcrypt";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  userId?: string
}

export async function PUT(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (currentUser?.role !== "ADMIN" ) {
    return NextResponse.error();
  }

  const { userId } = params;

  const body = await request.json();
  const {
    password,
  } = body;

  const hashedPassword = await bcrypt.hash(password, 12);


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
      hashedPassword,
    }
  })

  return NextResponse.json(user)
}