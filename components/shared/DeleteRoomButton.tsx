"use client";

import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { deleteRoom } from "@/lib/actions/room.actions";

interface DeleteRoomButtonProps {
  roomId: string;
  userId: string;
}

const DeleteRoomButton = ({ roomId, userId }: DeleteRoomButtonProps) => {
  const pathname = usePathname();
  const handleDeleteRoom = async () => {
    if (confirm("Are you sure you want to delete this room?")) {
      try {
        await deleteRoom(roomId, userId, pathname);
        toast.success("Room deleted successfully");
      } catch (error) {
        toast.error("Something went wrong, please try again");
      }
    }
  };

  return (
    <Button
      variant={"destructive"}
      onClick={handleDeleteRoom}
      className="w-full"
    >
      Delete Room
    </Button>
  );
};

export default DeleteRoomButton;
