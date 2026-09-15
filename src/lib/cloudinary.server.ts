import { v2 as cloudinary } from "cloudinary"

let configured = false

/** Server-only Cloudinary SDK (uploads, admin API). Do not import from client components. */
export function getCloudinary() {
  if (typeof window !== "undefined") {
    throw new Error("getCloudinary() is server-only")
  }

  if (!configured) {
    cloudinary.config({
      cloud_name:
        process.env.CLOUDINARY_CLOUD_NAME ||
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    })
    configured = true
  }

  return cloudinary
}

export type UploadResult = {
  publicId: string
  url: string
  secureUrl: string
  width?: number
  height?: number
  format?: string
  bytes?: number
}

export async function uploadImage(
  source: string | Buffer,
  options: {
    folder?: string
    publicId?: string
    overwrite?: boolean
    tags?: string[]
  } = {},
): Promise<UploadResult> {
  const cld = getCloudinary()
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
  )

  return {
    publicId: result.public_id,
    url: result.url,
    secureUrl: result.secure_url,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  }
}
