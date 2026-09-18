# Deploy TrekRoots

TrekRoots is a **single Next.js App Router app** (pages + `/api/enquiry` +
optional `/api/media/upload`). There is no separate backend service.

**Recommended: host everything on Vercel.**  
Railway is supported as an alternative for the same full app (Docker).

Splitting “frontend on Vercel / backend on Railway” is unnecessary here —
the enquiry API is a Next.js Route Handler and belongs with the site.

---

## What you need before deploy

| Service | Why | Where to get it |
|---------|-----|-----------------|
| GitHub repo | Already connected: `anilrana004/trekroots.com` | — |
| Cloudinary cloud name | Image URLs | [cloudinary.com](https://cloudinary.com) → Dashboard |
| Resend API key | Contact / booking / newsletter email | [resend.com](https://resend.com) → API Keys |
| Verified sender domain (optional) | So `info@trekroots.com` can send | Resend → Domains |

Copy values from `.env.example`. Never commit `.env.local`.

---

## Option A — Vercel (recommended)

### 1. Import the project

1. Open [vercel.com/new](https://vercel.com/new)
2. **Import** `anilrana004/trekroots.com`
3. Leave **Root Directory** empty — the GitHub repo root *is* the Next.js app
4. Framework: **Next.js** (auto-detected)
5. Build: `pnpm build` · Install: `pnpm install`

### 2. Environment variables

In **Project → Settings → Environment Variables**, add for Production
(and Preview if you want forms to work on preview URLs).

**Public (OK to leave visible):**

```
NEXT_PUBLIC_SITE_URL=https://trekroots.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
NEXT_PUBLIC_SANITY_PROJECT_ID=w00xdoog
NEXT_PUBLIC_SANITY_DATASET=production
```

**Secrets — create with “Sensitive” checked** (Vercel will show
“Needs Attention” if you skip this):

```
CLOUDINARY_CLOUD_NAME=...          # same as public cloud name is fine
CLOUDINARY_API_KEY=...             # only needed for upload API / CLI uploads
CLOUDINARY_API_SECRET=...
RESEND_API_KEY=re_...
```

Optional:

```
ENQUIRY_FROM_EMAIL=TrekRoots <onboarding@resend.dev>
ENQUIRY_TO_EMAIL=info@trekroots.com
SANITY_API_READ_TOKEN=...          # Viewer token only; drafts/preview later
```

**Do not add `CLOUDINARY_URL`.** This app uses discrete Cloudinary vars.
`CLOUDINARY_URL` embeds the API secret and triggers Vercel’s secret warnings.

To fix an existing “Needs Attention” Cloudinary key in Vercel:

1. Open the variable → **Edit** (or delete + recreate)
2. Enable **Sensitive**
3. Or use **Rotate Variable** if the value may have been exposed in the UI
4. Delete `CLOUDINARY_URL` if it exists
5. Redeploy

Notes:

- Until your domain is verified in Resend, keep
  `ENQUIRY_FROM_EMAIL=TrekRoots <onboarding@resend.dev>` and send only to
  the email of your Resend account.
- After verifying `trekroots.com` in Resend, switch to
  `TrekRoots <info@trekroots.com>`.
- Leave `MEDIA_UPLOAD_SECRET` empty so `/api/media/upload` stays off.

### 3. Deploy

Click **Deploy**. Every push to `main` redeploys automatically.

### 4. Custom domain

**Project → Settings → Domains** → add `trekroots.com` / `www.trekroots.com`
and point DNS as Vercel shows (usually `A` / `CNAME` records).

### 5. Smoke test

- Open `/` — hero and trek cards load (Cloudinary images)
- Submit the homepage / contact form — you should receive mail at
  `ENQUIRY_TO_EMAIL` (or see a clear error if Resend is misconfigured)
- WhatsApp / phone links still work without Resend

---

## Option B — Railway (full Next app)

Use this if you prefer Railway over Vercel. Same app, Docker image.

1. Open [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub**
2. Select `anilrana004/trekroots.com`
3. Set the service **root directory** to the Next app folder if needed
4. Railway reads `railway.toml` + `Dockerfile`
5. Add the **same env vars** as Vercel (Variables tab)
6. For the Docker build, also set a **build arg**:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (required at build time for client
     bundles — Railway: Variables → mark as available at build, or pass as
     Docker build arg)
7. Generate a public domain under **Settings → Networking**
8. Optional: attach your custom domain there

Health check hits `/`. Process listens on `PORT` (Railway injects it;
the standalone server defaults to 3000).

---

## Option C — Split Vercel + Railway (not recommended)

Only if you have an org constraint. You would need to:

1. Point `sendEnquiry` in `src/lib/enquiry.ts` at
   `NEXT_PUBLIC_API_URL + "/api/enquiry"`
2. Add CORS + `OPTIONS` on the Railway-hosted route
3. Deploy pages on Vercel and API on Railway with duplicated secrets

This repo does **not** wire that up — prefer Option A or B.

---

## Resend quick start

1. Create account → API key → paste as `RESEND_API_KEY`
2. Dev/test: from `onboarding@resend.dev`, to your signup email only
3. Production: add and verify `trekroots.com`, then set
   `ENQUIRY_FROM_EMAIL=TrekRoots <info@trekroots.com>`

---

## Checklist

- [ ] Repo pushed to GitHub `main`
- [ ] Cloudinary cloud name set (`NEXT_PUBLIC_…`)
- [ ] Cloudinary API key/secret marked **Sensitive** on Vercel (or omitted if unused)
- [ ] No `CLOUDINARY_URL` on Vercel
- [ ] Sanity project id + dataset set
- [ ] Resend key set (or accept WhatsApp-only enquiries)
- [ ] Deployed on Vercel **or** Railway
- [ ] Custom domain + HTTPS
- [ ] Form submission tested end-to-end
- [ ] WhatsApp number / phone still correct (`src/data/contact.ts`)
