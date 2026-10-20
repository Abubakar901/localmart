import { v2 as cloudinary } from "cloudinary";

import { cloudApiKey, cloudApiSecret, cloudName } from "@/lib/constants";

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudApiKey,
  api_secret: cloudApiSecret,
});

export async function uploadImageToCloudinary(fileBuffer: Buffer, folder: string = "shops"): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          return reject(new Error(error.message || "Cloudinary upload failed"));
        }
        if (!result) {
          return reject(new Error("Cloudinary upload failed with no result."));
        }
        resolve(result.secure_url);
      }
    );

    uploadStream.end(fileBuffer);
  });
};