import { z, ZodTypeAny } from "zod";

const validImageFile = z
  .custom<File | undefined>()
  .refine((file) => file, "Image is required")
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file"
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "Image must be less than 2MB");

export const numericString = (schema: ZodTypeAny) =>
  z.preprocess((a) => {
    if (typeof a === "string") {
      return parseInt(a, 10);
    } else if (typeof a === "number") {
      return a;
    } else {
      return undefined;
    }
  }, schema);

export const addRoomSchema = z.object({
  name: z.string().min(2, {
    message: "Room name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  sqft: numericString(
    z.number({
      message: "Sqft must be a valid number.",
    })
  ),
  capacity: numericString(
    z.number({
      message: "Capacity must be a valid number.",
    })
  ),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  amenities: z.string(),
  pricePerHour: numericString(
    z.number({
      message: "Price per hour must be a valid number.",
    })
  ),
  image: validImageFile,
});
