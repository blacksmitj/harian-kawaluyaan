import { getUsersById } from '@/app/actions/getUsersById';
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';

interface IParams {
  userId?: string;
}

export async function PUT(
  request: Request,
  {params}: {params: IParams}
) {
  const {userId} = params;

  const userData = await getUsersById({
    id: userId
  });

  if (!userData) {
    return NextResponse.error();
  }


  if (!userId || typeof userId !== 'string') {
    throw new Error('Kesalahan parameter ID')
  }

  const user = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      verifiedAccount: !userData.verifiedAccount,
    }
  })
  return NextResponse.json(user)
}