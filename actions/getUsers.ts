import prisma from "@/libs/prismadb";

export interface IUsersParams {
  id?: string;
  name?: string;
  email?: string
}

export async function getUsers(
  params: IUsersParams
) {
  try {
    const {
      id,
      name,
      email,
    } = params;

    let query: any = {}

    if (id) {
      query.id = id
    }

    if (name) {
      query.name = name
    }

    if (email) {
      query.email = email
    }

    const users = await prisma.user.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return users;
    
  } catch (error: any) {
    throw new Error(error);
  }

  
}