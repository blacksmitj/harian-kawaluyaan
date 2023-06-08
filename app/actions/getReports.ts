import prisma from "@/app/libs/prismadb";

export interface IReportsParams {
  userId?: string;
  name?: string;
  place?: string;
  location?: string;
}

export async function getReports(
  params: IReportsParams
) {
  try {
    const {
      userId,
      name,
      place,
      location,
    } = params;

    let query: any = {}

    if (userId) {
      query.userId = userId
    }
    
    if (name) {
      query.name = name
    }

    if (place) {
      query.place = place;
    }

    if (location) {
      query.location = location;
    }

    const reports = await prisma.report.findMany({
      where: query,
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return reports;
  } catch (error: any) {
    throw new Error(error);
  }
  
}