import RoomCard, { RoomCardProps } from "@/components/shared/cards/RoomCard";
import MyRoomsList from "@/components/shared/MyRoomsList";
import RoomCardSkeleton from "@/components/shared/skeletons/RoomCardSkeleton";
import { Button } from "@/components/ui/button";
import { getMyRooms } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React, { Suspense } from "react";

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
      {rooms?.length === 0 && (
        <h2 className="text-2xl font-medium text-blue-900 mt-2">
          There are no rooms yet.
        </h2>
      )}
      <Suspense fallback={<RoomCardSkeleton />}>
        <MyRoomsList rooms={rooms} />
      </Suspense>
    </div>
  );
};

export default MyRoomsPage;
