import RoomCard from "@/components/shared/cards/RoomCard";
import { getAllRooms } from "@/lib/actions/room.actions";

const RoomsList = async () => {
  const rooms = await getAllRooms();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomsList;
