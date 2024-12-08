import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ReviewCard from "./cards/ReviewCard";

export interface ReviewsProps {
  id: string;
  rating: number;
  comment: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
  };
}

const Reviews = ({ reviews }: { reviews: ReviewsProps[] }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-900">
          Reviews
        </CardTitle>
      </CardHeader>
      <CardContent>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </CardContent>
    </Card>
  );
};

export default Reviews;
