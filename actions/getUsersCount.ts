import prisma from "@/libs/prismadb";
import { User } from "@prisma/client";


export async function getUsersCount(
) {
  try {

    const users = await prisma.user.count({});

    return users;
    
  } catch (error: any) {
    throw new Error(error);
  }

  
}