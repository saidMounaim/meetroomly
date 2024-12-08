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

export async function deleteReview(
  reviewId: string,
  userId: string,
  pathname: string
) {
  try {
    const review = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) {
      throw new Error("Review not found");
    }
    if (review.userId !== userId) {
      throw new Error("Unauthorized to delete this review");
    }
    await prisma.review.delete({ where: { id: review.id } });
    revalidateTag(pathname);
  } catch (error) {
    console.log("Error to delete e review", error);
  }
}
