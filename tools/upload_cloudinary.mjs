/**
 * Upload local images into Cloudinary under trekroots/.
 *
 * Usage:
 *   node --env-file=.env.local tools/upload_cloudinary.mjs ./public/assets/images/logo.png trekroots/brand/logo
 *   node --env-file=.env.local tools/upload_cloudinary.mjs ./folder trekroots/gallery
 */
import { v2 as cloudinary } from "cloudinary"
import fs from "node:fs"
import path from "node:path"

const [,, inputPath, publicIdOrFolder] = process.argv

if (!inputPath) {
  console.error(
    "Usage: node --env-file=.env.local tools/upload_cloudinary.mjs <file-or-dir> [publicIdOrFolder]",
  )
  process.exit(1)
}

cloudinary.config({
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

async function uploadFile(filePath, publicId) {
  const result = await cloudinary.uploader.upload(filePath, {
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
    tags: ["trekroots"],
  })
  console.log(`✓ ${result.public_id} → ${result.secure_url}`)
  return result
}

async function main() {
  const abs = path.resolve(inputPath)
  const stat = fs.statSync(abs)

  if (stat.isFile()) {
    const publicId =
      publicIdOrFolder ||
      `trekroots/${path.basename(abs, path.extname(abs))}`
    await uploadFile(abs, publicId)
    return
  }

  if (stat.isDirectory()) {
    const folder = publicIdOrFolder || "trekroots/uploads"
    const files = fs
      .readdirSync(abs)
      .filter((f) => /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(f))
    for (const file of files) {
      const id = `${folder}/${path.basename(file, path.extname(file))}`
      await uploadFile(path.join(abs, file), id)
    }
    console.log(`Uploaded ${files.length} file(s) to ${folder}`)
    return
  }

  throw new Error("Input must be a file or directory")
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
