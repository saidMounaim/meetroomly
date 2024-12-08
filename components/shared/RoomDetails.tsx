import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Room } from "@prisma/client";
import ReviewForm from "./forms/ReviewForm";
import Reviews from "./Reviews";
import ReservationForm from "./forms/ReservationForm";

const RoomDetails = ({ room }: { room: Room }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-900">
            {room.name}
          </CardTitle>
          <CardDescription>{room.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Image
                src={room.image}
                alt={room.name}
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <p>
                <strong>Capacity:</strong> {room.capacity} people
              </p>
              <p>
                <strong>Size:</strong> {room.sqft} sq ft
              </p>
              <p>
                <strong>Price:</strong> ${room.pricePerHour}/hour
              </p>
              <p>
                <strong>Location:</strong> {room.location}
              </p>
              <p>
                <strong>Address:</strong> {room.address}
              </p>
              <p>
                <strong>Amenities:</strong> {room.amenities}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1">
          <Reviews />
          <ReviewForm />
        </div>
        <div className="flex-1 max-h-max">
          <ReservationForm />
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
