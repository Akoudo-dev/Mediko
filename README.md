# Muhiris Doctor — Medical Consultation Platform

Built from the Figma design "Medical Consultation Landing Page (Community)"
with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, **Auth.js
(NextAuth v5)**, and **PostgreSQL via Prisma**.

This is a fully functional app: registration, login (email + Google),
booking, a client dashboard, and an admin dashboard all read and write
real data.

## 1. Install

```bash
npm install
```

`npm install` automatically runs `prisma generate` afterward (via the
`postinstall` script) to create the typed database client.

## 2. Set up PostgreSQL

Any Postgres works — local or hosted (Neon, Supabase, Railway, Render...).

**Local, via Docker (simplest):**
```bash
docker run --name medical-postgres -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=medical_landing -p 5432:5432 -d postgres:16
```

**Local, native install:** install PostgreSQL, then:
```bash
createdb medical_landing
```

## 3. Configure environment

```bash
cp .env.example .env.local
npx auth secret          # writes/updates AUTH_SECRET in .env.local
```

Edit `.env.local` and set `DATABASE_URL`, e.g.:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/medical_landing"
```

Google OAuth (optional — email/password login works without it): create
credentials at https://console.cloud.google.com/apis/credentials, redirect
URI `http://localhost:3000/api/auth/callback/google`, then set
`AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`.

## 4. Create tables and seed data

```bash
npx prisma migrate dev --name init
npm run db:seed
```

This creates the `users`, `doctors`, and `appointments` tables and seeds 6
doctors plus one admin account:

```
Admin login:  admin@muhirisdoctor.com / admin1234
```

## 5. Localize the photos

The Figma photo exports are hot-linked through temporary
`figma.com/api/mcp/asset/...` URLs, which expire. Run this once, right
away, to download them into `/public/images` and switch the code to local
paths automatically:

```bash
node scripts/setup-images.mjs
```

If a link has already expired, `ImageWithFallback` shows a clean
placeholder instead of a broken image icon, so the layout never breaks.

## 6. Run

```bash
npm run dev
```

Open http://localhost:3000. Create a patient account from `/register`, or
sign in with Google.

## What's functional

| Feature                     | Where                          |
| ---------------------------- | ------------------------------- |
| Registration (email/password)| `/register`                     |
| Login (email + Google)       | `/login`                        |
| Book an appointment           | `/book` (requires login)        |
| Client dashboard              | `/dashboard` — my appointments, cancel |
| Admin dashboard                | `/admin` — stats, manage all appointments, manage doctors, view users |
| Testimonials carousel          | Home page — Embla carousel, autoplay, arrows, dots |
| Route protection               | `proxy.ts` (Next.js 16's middleware convention) redirects unauthenticated/unauthorized visitors |

Every header nav link and CTA routes to a real page — no dead `#` anchors
except in-page section links like `/#about`.

### Roles

- **client** (default): can book appointments, see and cancel their own,
  from `/dashboard`.
- **admin**: everything a client can do, plus `/admin` — see every
  appointment and user, change appointment status
  (pending/confirmed/cancelled), and add/activate/deactivate/delete
  doctors. Google sign-ins are always provisioned as `client`.

### Promoting a user to admin

```bash
npx prisma studio
```
Open the `users` table and change a row's `role` to `admin` — or run:
```sql
UPDATE users SET role = 'admin' WHERE email = 'someone@example.com';
```

## Project structure

```
prisma/
  schema.prisma        Database schema (User, Doctor, Appointment)
  seed.ts              Seeds doctors + admin account
app/
  api/                 API routes (auth, register, appointments, admin/*)
  admin/               Admin dashboard (server component)
  dashboard/           Client dashboard (server component)
  book/, login/, register/, doctors/, specialties/, opd/, faq/, terms/
components/
  admin/, dashboard/, auth/   Client components for interactive bits
  Testimonials.tsx     Embla carousel (autoplay + arrows + dots)
lib/
  prisma.ts            Prisma client singleton
  repository.ts        All data access (users, doctors, appointments)
  auth.ts              Auth.js config (Google + Credentials, JWT session)
  require-admin.ts      Helper to gate admin-only API routes
proxy.ts               Route protection (Next.js 16 "proxy", replaces middleware)
```

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4 (`@theme inline` design tokens in `app/globals.css`)
- Auth.js v5 (Google OAuth + Credentials, JWT sessions)
- **Prisma + PostgreSQL**
- Embla Carousel (testimonials — Next.js has no built-in carousel, this is
  the de facto standard lightweight carousel for React/Next projects)
- bcryptjs (password hashing)
- lucide-react (icons)
- @fontsource (Plus Jakarta Sans, Inter, Open Sans — self-hosted, no
  runtime Google Fonts fetch needed)

## Useful Prisma commands

```bash
npx prisma studio        # visual database browser
npx prisma migrate dev   # apply schema changes, create a new migration
npm run db:seed          # re-run the seed script
```

## Troubleshooting

**`npm install` / `prisma generate` fails trying to reach
`binaries.prisma.sh`.** Prisma downloads a small platform-specific engine
on first install. This needs normal outbound internet access — if you're
behind a restrictive corporate firewall/proxy, allow that domain (or set
`PRISMA_ENGINES_MIRROR` to an internal mirror if your org provides one).
This is unrelated to your database itself.

**`Can't reach database server`.** Check `DATABASE_URL` in `.env.local`
and make sure Postgres is actually running (`docker ps`, or
`pg_isready`).

**Login returns "There was a problem with the server configuration."**
`AUTH_SECRET` is missing — run `npx auth secret` (see step 3).

**Login works locally but not when deployed behind a custom domain/proxy
(not Vercel).** `lib/auth.ts` sets `trustHost: true`, which is required
for self-hosted deployments (Docker, VPS, etc.) — already configured.

**Google button shows a configuration error.** `AUTH_GOOGLE_ID` /
`AUTH_GOOGLE_SECRET` aren't set — either configure them (step 3) or use
the email/password form, which works without any setup.

**I want to reset all data.**
```bash
npx prisma migrate reset
```
This drops and recreates all tables, then re-runs the seed script.
