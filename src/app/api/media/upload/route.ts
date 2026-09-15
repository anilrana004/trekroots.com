import { NextRequest, NextResponse } from "next/server"
import { uploadImage } from "@/lib/cloudinary.server"

/**
 * Upload an image to Cloudinary.
 * POST multipart/form-data with fields:
 *   - file: image blob
 *   - folder?: string (default trekroots)
 *   - publicId?: string
 *
 * Protect this route before exposing publicly (API key / session).
 */
export async function POST(req: NextRequest) {
  try {
    const cloud =
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const key = process.env.CLOUDINARY_API_KEY
    const secret = process.env.CLOUDINARY_API_SECRET

    if (!cloud || !key || !secret) {
      return NextResponse.json(
        { error: "Cloudinary is not configured" },
        { status: 500 },
      )
    }

    const form = await req.formData()
    const file = form.get("file")
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "file is required" }, { status: 400 })
    }

    const folder = String(form.get("folder") || "trekroots")
    const publicId = form.get("publicId")
      ? String(form.get("publicId"))
      : undefined

    const buffer = Buffer.from(await file.arrayBuffer())
    const dataUri = `data:${file.type || "image/jpeg"};base64,${buffer.toString("base64")}`

    const result = await uploadImage(dataUri, {
      folder,
      publicId,
      tags: ["trekroots", "upload-api"],
    })

    return NextResponse.json({ ok: true, asset: result })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
