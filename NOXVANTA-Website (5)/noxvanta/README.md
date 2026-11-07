# NOXVANTA — NXV esports website

Next.js 15 + React 19 + TypeScript + Tailwind + Supabase Auth. Target deployment: `https://noxvanta.vercel.app`.

## What is included

- Responsive public site, navigation, homepage and reusable UI components.
- Team roster with five clearly identified placeholders; no fabricated player data.
- Tactical Hub with map/side selectors and preparation sections. Map pool is a configurable starter list, **not a claim about the current official competitive rotation**.
- Strategy Builder: create/delete text playbooks, stored in the current browser's localStorage. This is not cloud sync and does not yet include map drawing or PNG export.
- Stats, Match Center and News empty states that avoid invented results.
- Recruitment form with client-side validation. It explicitly does not send or persist submissions until a backend is configured.
- Profile sign-in/registration and profile metadata/password update through Supabase Auth when configured. Riot ID is a manual label, not Riot OAuth verification.
- Admin route checks trusted `app_metadata.role === 'admin'`; never use user-editable `user_metadata` for authorization.
- Privacy and Terms draft pages, SEO metadata, Open Graph, sitemap and robots.

## Run locally

1. Install Node.js 20.9 or newer.
2. Extract the ZIP and open this folder in a terminal.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local`.
5. Configure Supabase values (see below). Public pages can run without Supabase; account and admin features cannot.
6. Run `npm run dev` and open `http://localhost:3000`.
7. Run `npm run build` before deploying.

## Supabase setup (required for real accounts)

1. Create a Supabase project.
2. In Project Settings → API, copy Project URL and the publishable/anon key into `.env.local` as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Enable Email provider under Authentication → Providers. Enable email confirmation and configure SMTP for production.
4. Configure the Site URL as `https://noxvanta.vercel.app` and add the matching redirect URL(s) under Authentication → URL Configuration.
5. Create the owner account through the Profile page or Supabase Authentication → Users. The intended display name is `Junior`. Do not place the supplied password in source code, GitHub, Vercel variables or this README. Because a password was shared in chat, use a new unique password before launch.
6. The owner account is **Junior**. Assign trusted `app_metadata` through the Supabase dashboard or a server-side admin process: `{ "team_role": "owner" }`. Never assign roles from the browser or `user_metadata`, and never expose the service-role key. The legacy `{ "role": "admin" }` claim is also recognized as Owner.
7. Assign other permissions only through trusted `app_metadata`: `{ "team_role": "sub" }` for Sub-owner, `{ "team_role": "igl" }` for IGL, and `{ "team_role": "authorized" }` for an explicitly authorized strategy editor. Regular players receive no management role.
8. Strategy creation/deletion is shown only to Owner, Sub-owner, IGL and authorized users. Main roster and reserve bench management is shown only to Owner and Sub-owner. The current starter stores these drafts in local browser storage; they are not shared between devices. Implement server routes and RLS policies before using this for real multi-user management.
7. Enable Row Level Security on every table you add. The starter does not create tables or claim that CRUD management is already connected.

### Future database recommendations

Create tables for `players`, `matches`, `news`, `player_stats`, `strategies`, `applications` and `map_pool`. Add `created_at`, `updated_at`, stable IDs and appropriate foreign keys. Enable RLS. Public read access should be limited to published records; insert/update/delete should require a verified admin claim. Recruitment submissions should be insert-only for anonymous users, inaccessible to public reads, and readable only by authorized admins. Add rate limiting / CAPTCHA and server-side validation before opening applications. Store uploaded avatars in a private or appropriately scoped Supabase Storage bucket with file type/size validation.

## Vercel deployment

1. Push the extracted project to a new GitHub repository.
2. Sign in to Vercel → **Add New → Project** → import that GitHub repository.
3. Framework Preset: Next.js (normally detected automatically). Root Directory: `./`.
4. In Project → Settings → Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` = `https://noxvanta.vercel.app`
5. Do **not** add the Supabase service-role key unless a future server-only feature explicitly needs it. Never prefix secrets with `NEXT_PUBLIC_`.
6. Click Deploy. Vercel will provide `noxvanta.vercel.app` if that project name is available. If unavailable, rename the Vercel project to `noxvanta` if possible or use the assigned URL.
7. After deployment, add `https://noxvanta.vercel.app` and its auth callback paths to Supabase Authentication URL Configuration. Test account creation, confirmation, sign-in, sign-out and password updates.
8. Push future changes to the connected GitHub branch; Vercel will build and deploy automatically.

## Before public launch — important

- Replace the Privacy Policy and Terms draft with the operator's legal identity, contact details, purposes, legal bases, retention schedule, processors, international transfer information and applicable terms. Get a GDPR/legal review. The current text is a starter, not legal advice or proof of compliance.
- Add a real recruitment backend, server-side validation, spam protection, retention/deletion process and a clear privacy notice before collecting applicants' personal data. Be especially careful with minors.
- Add original or licensed map images under `public/maps`; verify the current official VALORANT competitive map rotation from Riot's current materials before marking active maps. Do not use scraped/protected artwork without permission.
- Add Riot OAuth/API integration only if approved and compliant with Riot's developer policies. A typed Riot ID is not a verified linked account.
- Implement server-side admin CRUD routes and RLS policies before treating Admin Panel as a complete content management system.
- Configure an authorized sender address, Discord/social links, official contact email and favicon/logo files.
- The security question requested is intentionally not used: security questions are weak and can expose personal information. Use email verification, secure password reset and optionally MFA instead.

## Project structure

```text
app/                 Next.js routes, metadata, sitemap, robots
components/           Shared navigation, footer, page intro and cards
lib/                  Sample data and Supabase browser client
public/maps/          Place authorized map artwork here
.env.example          Environment variable template
```


## Team permissions

- Owner account name: **Junior**.
- Strategy permissions: `owner`, `sub`, `igl`, `authorized`.
- Roster and reserve bench permissions: `owner`, `sub` only.
- The public sign-in entry is the Profile page. A separate “Owner Login” entry is not included.
- These UI checks are not a replacement for database RLS/server-side authorization.

## Idiomas

O site inclui seletor PT / EN / ES no cabeçalho. A preferência é guardada no navegador e o português é o idioma inicial. As traduções de interface estão em `components/Language.tsx`; ao acrescentar textos, adiciona as respetivas entradas ao dicionário para manter os três idiomas consistentes.
