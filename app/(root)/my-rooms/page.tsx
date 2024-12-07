import RoomCard, { RoomCardProps } from "@/components/shared/cards/RoomCard";
import { Button } from "@/components/ui/button";
import { getMyRooms } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const MyRoomsPage = async () => {
  const { userId } = await auth();
  const rooms = await getMyRooms(userId!);
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">My Rooms</h1>
        <Button asChild>
          <Link href="/add-room">Add New Room</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms?.map((room: RoomCardProps) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default MyRoomsPage;
