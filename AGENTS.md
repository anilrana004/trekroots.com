# Project Guidance

## User Preferences

[No preferences yet]

## Verified Commands

Run from project root:

- **install**: `pnpm install --prefer-offline`
- **dev**: `pnpm dev`
- **build**: `pnpm build`
- **start**: `pnpm start`

## Deploy

See **DEPLOY.md**. Preferred host is Vercel (full Next app). Railway Docker
is supported as an alternative. Do not split frontend/backend — enquiry mail
is a Next.js Route Handler.

## Learnings

- Migrated off Caffeine/ICP Motoko to Next.js App Router with static catalog data in `src/data/`.
- Bookings are WhatsApp enquiry only (no Razorpay backend).
- `/api/media/upload` is ops-only and stays disabled until `MEDIA_UPLOAD_SECRET` is set.
