import React, { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ReviewCard from "./cards/ReviewCard";
import { auth } from "@clerk/nextjs/server";
import ReviewCardSkeleton from "./skeletons/ReviewCardSkeleton";

export interface ReviewsProps {
  id: string;
  rating: number;
  comment: string;
  user: {
    id: string;
    clerkId: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
  };
}

const Reviews = async ({ reviews }: { reviews: ReviewsProps[] }) => {
  const { userId } = await auth();
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-900">
          Reviews
        </CardTitle>
      </CardHeader>
      <CardContent>
        {reviews?.length === 0 && (
          <h2 className="text-2xl font-medium text-blue-900 mt-2">
            There are no reviews yet.
          </h2>
        )}
        <Suspense fallback={<ReviewCardSkeleton />}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} userId={userId!} />
          ))}
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default Reviews;
