import prisma from "@/app/libs/prismadb";

export interface IParams {
  id?: string;
}

export async function getUsersById(
  params: IParams
) {
  try {
    const { id } = params;
    
    const query: any = {}

    if (id) {
      query.id = id
    }

    const users = await prisma.user.findUnique({
      where: {id},
    });

    return users;
    
  } catch (error: any) {
    throw new Error(error);
  }
}