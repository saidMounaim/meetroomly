import RoomCard from "@/components/shared/cards/RoomCard";
import { getAllRooms } from "@/lib/actions/room.actions";
import { auth } from "@clerk/nextjs/server";

export interface RoomsListProps {
  minPrice?: any;
  priceMax?: any;
  query?: any;
}

const RoomsList = async ({ where }: { where: RoomsListProps }) => {
  const { userId } = await auth();
  const rooms = await getAllRooms({ where });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} userId={userId!} />
      ))}
    </div>
  );
};

export default RoomsList;
