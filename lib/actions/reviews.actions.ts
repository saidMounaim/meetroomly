"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { revalidateTag } from "next/cache";

interface addReviewProps {
  rating: number;
  comment: string;
  roomId: string;
}

export async function addReview(newReview: addReviewProps, pathname: string) {
  const { userId } = await auth();
  try {
    const { rating, comment, roomId } = newReview;
    await prisma.review.create({
      data: {
        rating,
        comment,
        roomId,
        userId: userId!,
      },
    });
    revalidateTag(pathname);
  } catch (error) {
    console.log("Error to creare e review", error);
  }
}
