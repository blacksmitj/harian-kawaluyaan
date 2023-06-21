import prisma from "@/app/libs/prismadb";


export async function getReports(
) {
  try {
    const reports = await prisma.report.findMany({
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });
    return reports;
  } catch (error: any) {
    throw new Error(error);
  }
  
}