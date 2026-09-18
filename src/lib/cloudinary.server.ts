import "server-only";
import { v2 as cloudinary } from "cloudinary";

let configured = false;

/**
 * Server-only Cloudinary SDK (uploads / admin API).
 * Importing this module from a Client Component will fail the build.
 */
export function getCloudinary() {
  if (!configured) {
    const cloud_name =
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const api_key = process.env.CLOUDINARY_API_KEY;
    const api_secret = process.env.CLOUDINARY_API_SECRET;

    if (!cloud_name || !api_key || !api_secret) {
      throw new Error(
        "Cloudinary server SDK requires CLOUDINARY_CLOUD_NAME (or NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME), CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET",
      );
    }

    // Prefer discrete env vars. Do not rely on CLOUDINARY_URL in this app —
    // a single URL embeds the secret and is easy to mishandle in dashboards.
    cloudinary.config({
      cloud_name,
      api_key,
      api_secret,
      secure: true,
    });
    configured = true;
  }

  return cloudinary;
}

export type UploadResult = {
  publicId: string;
  url: string;
  secureUrl: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
};

export async function uploadImage(
  source: string | Buffer,
  options: {
    folder?: string;
    publicId?: string;
    overwrite?: boolean;
    tags?: string[];
  } = {},
): Promise<UploadResult> {
  const cld = getCloudinary();
  const result = await cld.uploader.upload(
    typeof source === "string"
      ? source
      : `data:image/jpeg;base64,${source.toString("base64")}`,
    {
      folder: options.folder ?? "trekroots",
      public_id: options.publicId,
      overwrite: options.overwrite ?? true,
      tags: options.tags ?? ["trekroots"],
      resource_type: "image",
    },
  );

  return {
    publicId: result.public_id,
    url: result.url,
    secureUrl: result.secure_url,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  };
}
