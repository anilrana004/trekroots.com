# Project Guidance

## User Preferences

[No preferences yet]

## Verified Commands

Run from the Next.js app (`trekroots/`):

- **install**: `pnpm install --prefer-offline`
- **dev**: `pnpm dev`
- **build**: `pnpm build`
- **start**: `pnpm start`

Standalone Sanity Studio lives beside this app at `../studio` (parent
`Desktop/trekroots/studio`). From that folder: `npm install` then `npm run dev`
(http://localhost:3333). Project ID `w00xdoog`, dataset `production`.

## Deploy

See **DEPLOY.md**. Preferred host is Vercel (full Next app). Railway Docker
is supported as an alternative. Do not split frontend/backend — enquiry mail
is a Next.js Route Handler.

## Learnings

- Migrated off Caffeine/ICP Motoko to Next.js App Router with static catalog data in `src/data/`.
- Bookings are WhatsApp enquiry only (no Razorpay backend).
- `/api/media/upload` is ops-only and stays disabled until `MEDIA_UPLOAD_SECRET` is set.
- Blog posts are Sanity-backed (`blogPost` schema in Studio). Next.js owns presentation under `/blog`.
- Do not embed Studio in Next.js; keep it standalone for admin.trekroots.com later.
- On Vercel, mark `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, and `RESEND_API_KEY` as Sensitive. Do not set `CLOUDINARY_URL`.
