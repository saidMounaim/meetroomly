import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

export const addRoomSchema = z.object({
  name: z.string().min(2, {
    message: "Room name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  sqft: z.number().min(1, {
    message: "Square footage must be at least 1.",
  }),
  capacity: z.number().min(1, {
    message: "Capacity must be at least 1.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  amenities: z.string(),
  pricePerHour: z.number().min(0, {
    message: "Price per hour must be a positive number.",
  }),
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});
