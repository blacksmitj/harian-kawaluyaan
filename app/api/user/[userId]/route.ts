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