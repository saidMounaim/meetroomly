"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { addReview } from "@/lib/actions/reviews.actions";
import { usePathname } from "next/navigation";

const ReviewForm = ({ roomId }: { roomId: string }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment || !newReview.rating) {
      toast.error("Please fill in all fields");
    } else {
      setLoading(true);
      try {
        await addReview({ ...newReview, roomId }, pathname);
        toast.success("Rating added successfully");
        setNewReview({
          rating: 5,
          comment: "",
        });
      } catch (error) {
        toast.error("Something went wrong, please try again");
      } finally {
        setLoading(false);
      }
    }
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
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting Review" : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
