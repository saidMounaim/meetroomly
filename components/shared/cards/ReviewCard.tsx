"use client";

import { StarIcon, Trash2 } from "lucide-react";
import React from "react";
import { ReviewsProps } from "../Reviews";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteReview } from "@/lib/actions/reviews.actions";
import { usePathname } from "next/navigation";

const ReviewCard = ({
  review,
  userId,
}: {
  review: ReviewsProps;
  userId: string;
}) => {
  const pathname = usePathname();
  const reviewId = review.id;
  const handleDeleteReview = async () => {
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(reviewId, userId, pathname);
        toast.success("Review deleted successfully");
      } catch (error) {
        toast.error("Something went wrong, please try again");
      }
    }
  };

  return (
    <div className="mb-4 pb-4 border-b last:border-b-0">
      <div className="flex items-center mb-2">
        <span className="font-semibold mr-2">
          {review.user.firstName} {review.user.lastName}
        </span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`w-4 h-4 ${
                i < review.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <Button
          variant={"destructive"}
          className="ml-4"
          onClick={handleDeleteReview}
        >
          <Trash2 />
        </Button>
      </div>
      <p>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
