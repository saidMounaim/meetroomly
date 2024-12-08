import { getRoomBySlug } from "@/lib/actions/room.actions";
import { notFound } from "next/navigation";
import React from "react";
import RoomDetails from "@/components/shared/RoomDetails";

const RoomDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  const room = await getRoomBySlug(slug);
  if (!room) {
    notFound();
  }
  return <RoomDetails room={room} />;
};

export default RoomDetailsPage;
