import React from "react";
import RoomCard, { RoomCardProps } from "./cards/RoomCard";

const MyRoomsList = ({ rooms }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms?.map((room: RoomCardProps) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default MyRoomsList;
