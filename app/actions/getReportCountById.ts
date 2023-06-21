import prisma from "@/app/libs/prismadb";

export interface IParams {
  userId?: string;
}

export async function getReportCountById(
  params: IParams
) {
  try {
    const { userId } = params;
    const reports = await prisma.report.count({
      where: {
        userId: userId
      }
    });
    return reports;
  } catch (error: any) {
    throw new Error(error);
  }
  
}