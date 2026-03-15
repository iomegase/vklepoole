import "server-only";

import { createHash } from "crypto";

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "vklepoole";

  if (!cloudName || !apiKey || !apiSecret) {
    return null;
  }

  return { cloudName, apiKey, apiSecret, folder };
}

export function isCloudinaryConfigured() {
  return Boolean(getCloudinaryConfig());
}

function createSignature(parameters: Record<string, string>, apiSecret: string) {
  const serialized = Object.entries(parameters)
    .filter(([, value]) => value.length > 0)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1")
    .update(`${serialized}${apiSecret}`)
    .digest("hex");
}

export async function uploadAssetToCloudinary(file: File) {
  const config = getCloudinaryConfig();

  if (!config) {
    throw new Error("Cloudinary is not configured.");
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const parameters = {
    folder: config.folder,
    timestamp,
  };

  const signature = createSignature(parameters, config.apiSecret);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", config.apiKey);
  formData.append("timestamp", timestamp);
  formData.append("folder", config.folder);
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/auto/upload`,
    {
      method: "POST",
      body: formData,
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Cloudinary upload failed: ${details}`);
  }

  const payload = (await response.json()) as {
    public_id: string;
    resource_type: "image" | "video" | "raw";
    secure_url: string;
  };

  return {
    publicId: payload.public_id,
    mediaType: payload.resource_type === "video" ? "video" : "image",
    url: payload.secure_url,
  };
}
