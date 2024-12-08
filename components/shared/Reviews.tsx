import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ReviewCard from "./cards/ReviewCard";

const Reviews = () => {
  const reviews = [
    {
      id: "review_1",
      author: "John Doe",
      rating: 5,
      comment: "Excellent room, perfect for our team meeting!",
    },
    {
      id: "review_2",
      author: "Jane Smith",
      rating: 4,
      comment: "Great amenities, but a bit pricey.",
    },
  ];
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
