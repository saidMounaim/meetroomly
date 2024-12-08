"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReviewForm = () => {
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New review:", newReview);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-900">
          Leave a Review
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <Label htmlFor="rating">Rating</Label>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-6 h-6 cursor-pointer ${
                    i < newReview.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                />
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              required
            />
          </div>
          <Button type="submit">Submit Review</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
