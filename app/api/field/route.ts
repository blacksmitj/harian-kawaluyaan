import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function GET(
    request: NextRequest,
  ) {
    const { nextUrl: { searchParams } } = request;
    console.log("paramex check", searchParams.get('input'));
    console.log("paramex check", searchParams.get('field'));

    const input = searchParams.get('input');
    const field = searchParams.get('field');
    
    // const currentUser = await getCurrentUser();

    // if (!currentUser) {
    //   return NextResponse.error();
    // }

    if (!field) {
        return NextResponse.error();
    }


    const fieldValue = await prisma.report.findMany({
      where: {
        [field]: {
          contains: input,
          mode: 'insensitive'
        }
      },
      orderBy: {
        [field]: 'asc',
      },
      select: {
        [field]: true
      },
      distinct: [field]
    });
  return NextResponse.json(fieldValue);
}