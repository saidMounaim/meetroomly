import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteRoomButton from "../DeleteRoomButton";

export interface RoomCardProps {
  id: string;
  image: string;
  name: string;
  slug: string;
  capacity: number;
  pricePerHour: number;
  user: {
    clerkId: string;
  };
}

const RoomCard = ({
  room,
  userId,
}: {
  room: RoomCardProps;
  userId: string;
}) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <Image
          src={room.image}
          alt={room.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="text-xl mb-2">{room.name}</CardTitle>
        <p className="text-gray-600">Capacity: {room.capacity} people</p>
        <p className="text-gray-600">${room.pricePerHour}/hour</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-1">
        <Button asChild className="w-full">
          <Link href={`/room/${room.slug}`}>View Details</Link>
        </Button>
        {userId === room.user?.clerkId && (
          <DeleteRoomButton roomId={room.id} userId={room.user.clerkId} />
        )}
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
