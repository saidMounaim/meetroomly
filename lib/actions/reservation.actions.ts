"use server";

import { revalidateTag } from "next/cache";
import prisma from "../prisma";
import { auth } from "@clerk/nextjs/server";

interface makeReservationProps {
  checkInDate: any;
  checkOutDate: any;
  checkInTime: string;
  checkOutTime: string;
  roomId: string;
}

export async function makeReservation(
  {
    checkInDate,
    checkOutDate,
    checkInTime,
    checkOutTime,
    roomId,
  }: makeReservationProps,
  pathname: string
) {
  const { userId } = await auth();
  try {
    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!room) {
      throw new Error("Room not found");
    }

    const overlappingReservation = await prisma.reservation.findFirst({
      where: {
        roomId: roomId,
        NOT: {
          OR: [
            { checkOutDate: { lt: checkInDate } },
            { checkInDate: { gt: checkOutDate } },
            {
              AND: [
                { checkInDate: checkOutDate },
                { checkOutTime: { lte: checkInTime } },
              ],
            },
            {
              AND: [
                { checkOutDate: checkInDate },
                { checkInTime: { gte: checkOutTime } },
              ],
            },
          ],
        },
      },
    });

    if (overlappingReservation) {
      throw new Error(
        "This room is already reserved for the selected date and time."
      );
    }
    revalidateTag(pathname);

    return await prisma.reservation.create({
      data: {
        roomId,
        checkInDate,
        checkOutDate,
        checkInTime,
        checkOutTime,
        userId: userId!,
      },
    });
  } catch (error) {
    console.log("Error to make a reservation", error);
  }
}
