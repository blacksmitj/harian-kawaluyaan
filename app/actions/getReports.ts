import prisma from "@/app/libs/prismadb";


export async function getReports(
) {
  try {
    const reports = await prisma.report.count();
    return reports;
  } catch (error: any) {
    throw new Error(error);
  }
  
}