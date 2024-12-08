import { StarIcon } from "lucide-react";
import React from "react";
import { ReviewsProps } from "../Reviews";

const ReviewCard = ({ review }: { review: ReviewsProps }) => {
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
      </div>
      <p>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
