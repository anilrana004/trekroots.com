import { NextRequest, NextResponse } from "next/server"
import { uploadImage } from "@/lib/cloudinary.server"

/**
 * Ops-only Cloudinary upload. Not used by the public site — the catalog
 * already points at Cloudinary URLs. Protect with MEDIA_UPLOAD_SECRET and
 * prefer `pnpm media:upload` locally for bulk work.
 *
 * POST multipart/form-data:
 *   - file: image blob
 *   - folder?: string (default trekroots)
 *   - publicId?: string
 * Header: Authorization: Bearer <MEDIA_UPLOAD_SECRET>
 */
export async function POST(req: NextRequest) {
  const secret = process.env.MEDIA_UPLOAD_SECRET?.trim()
  if (!secret) {
    return NextResponse.json(
      { error: "Upload API is disabled. Set MEDIA_UPLOAD_SECRET to enable it." },
      { status: 503 },
    )
  }

  const auth = req.headers.get("authorization") ?? ""
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : ""
  if (token !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const cloud =
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const key = process.env.CLOUDINARY_API_KEY
    const secretKey = process.env.CLOUDINARY_API_SECRET

    if (!cloud || !key || !secretKey) {
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
