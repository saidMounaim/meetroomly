"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { generateUniqueSlug } from "../utils";
import { addRoomSchema } from "../validations";
import { uploadImageToCloudinary } from "./cloudinary.actions";
import { RoomsListProps } from "@/components/shared/RoomsList";

export async function addRoom(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { userId } = await auth();

  const {
    name,
    description,
    sqft,
    capacity,
    address,
    amenities,
    location,
    pricePerHour,
    image,
  } = addRoomSchema.parse(values);

  try {
    const slug = generateUniqueSlug(name);

    const imageResult = await uploadImageToCloudinary(image!);

    if (imageResult.error) {
      throw new Error("Upload failed");
    }

    if (imageResult.data) {
      const addRoomDetails = {
        name,
        slug,
        description,
        sqft: Number(sqft),
        capacity: Number(capacity),
        location,
        address,
        amenities,
        pricePerHour: Number(pricePerHour),
        userId: userId!,
        image: imageResult.data.url,
      };

      const room = await prisma.room.create({ data: addRoomDetails });

      return room;
    }
  } catch (error) {
    console.log("Error to create a room", error);
    throw new Error("Error to create a room");
  }
}

export async function getRoomBySlug(slug: string) {
  try {
    const room = await prisma.room.findUnique({
      where: { slug },
      include: {
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });
    return room;
  } catch (error) {
    console.log("Error to fetch room", error);
    throw new Error("Error to fecth room");
  }
}

export async function getAllRooms({ where }: { where: RoomsListProps }) {
  const { minPrice, priceMax, query } = where;
  try {
    const rooms = await prisma.room.findMany({
      where: {
        AND: [
          minPrice !== undefined
            ? { pricePerHour: { gte: Number(minPrice) } }
            : {},
          priceMax !== undefined
            ? { pricePerHour: { lte: Number(priceMax) } }
            : {},
          query !== undefined
            ? {
                OR: [
                  {
                    name: { contains: query, mode: "insensitive" },
                  },
                  {
                    description: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {},
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });
    return rooms;
  } catch (error) {
    console.log("Error to fetch rooms", error);
    throw new Error("Error to fecth rooms");
  }
}
