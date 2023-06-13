import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';

interface IParams {
  seenId?: string
}

export async function POST(
  request: Request,
  {params}: {params: IParams}
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error()
  }

  const {seenId} = params;

  if (!seenId || typeof seenId !== "string") {
    throw new Error("Id Laporan tidak ditemukan")
  }

  let seenIds = [...(currentUser.seenIds || [])]

  seenIds.push(seenId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      seenIds
    }
  })

  return NextResponse.json(user)
}