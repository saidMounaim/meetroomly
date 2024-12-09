import React from "react";
import RoomCard, { RoomCardProps } from "./cards/RoomCard";
import { auth } from "@clerk/nextjs/server";

const MyRoomsList = async ({ rooms }: any) => {
  const { userId } = await auth();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms?.map((room: RoomCardProps) => (
        <RoomCard key={room.id} room={room} userId={userId!} />
      ))}
    </div>
  );
};

export default MyRoomsList;
