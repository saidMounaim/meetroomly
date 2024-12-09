"use serve";

import prisma from "../prisma";

interface userDetailsProps {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
}

interface updateUserProps {
  firstName?: string;
  lastName?: string;
  image?: string;
}

export async function createUser(userDetails: userDetailsProps) {
  try {
    const user = await prisma.user.create({ data: userDetails });
    return user;
  } catch (error) {
    console.log("Error to create a user", error);
  }
}

export async function updateUser(userDetails: updateUserProps, userId: string) {
  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = await prisma.user.update({
      where: { clerkId: userId },
      data: userDetails,
    });
    return updatedUser;
  } catch (error) {
    console.log("Error to update a user", error);
  }
}

export async function deleteUser(userId: string) {
  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      throw new Error("User not found");
    }
    const deleteUser = await prisma.user.delete({
      where: { clerkId: userId },
    });
    return deleteUser;
  } catch (error) {
    console.log("Error to delete a user", error);
  }
}

export async function getMyRooms(userId: string) {
  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      throw new Error("User not found");
    }
    const rooms = await prisma.room.findMany({
      where: { userId },
      include: {
        user: true,
      },
    });
    return rooms;
  } catch (error) {
    console.log("Error to fetch rooms", error);
  }
}
