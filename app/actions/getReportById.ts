import prisma from "@/app/libs/prismadb";


export default async function getReportById (reportId: string){
  try {
    const report = await prisma.report.findUnique({
      where: {
        id: reportId
      },
      include: {
        user: true
      }
    });

    if (!report) {
      return null;
    }

    return report
  } catch (error: any) {
    throw new Error(error);
  }
}
