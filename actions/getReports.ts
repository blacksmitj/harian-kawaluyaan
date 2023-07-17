import prisma from "@/libs/prismadb";


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
      take: 10
    });
    return reports;
  } catch (error: any) {
    throw new Error(error);
  }
  
}