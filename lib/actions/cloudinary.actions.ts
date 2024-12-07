"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLD_CLOUD_NAME,
  api_key: process.env.CLD_API_KEY,
  api_secret: process.env.CLD_API_SECRET,
  secure: true,
});

export async function uploadImageToCloudinary(image: File) {
  try {
    if (!image) {
      throw new Error("No file provided");
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const dataUrl = `data:${image.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(dataUrl, {
      resource_type: "auto",
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return { success: false, error: "Upload failed" };
  }
}
