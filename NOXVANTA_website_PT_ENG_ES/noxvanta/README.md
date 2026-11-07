# NOXVANTA — Official VALORANT Esports Website

Next.js + React + TypeScript + Tailwind CSS + Supabase. Interface available in Portuguese (PT), English (ENG) and Spanish (ES).

## Included
- Responsive black/white/red esports interface.
- PT / ENG / ES language selector; language state is in memory (no language cookie/localStorage).
- Home, Team, Match Center, Statistics, News, Tactical Hub, Recruitment, Profile, Admin and Legal sections.
- Strategy Builder with map/side selection, click-to-place demo markers, SVG export and Supabase insert.
- Supabase Auth login and database role lookup.
- Database schema with Row Level Security: only `owner` and `strategist` roles can create/update/delete strategies.
- No Supabase Storage bucket. Avatar and news images use external URLs.
- SEO metadata, robots.txt and sitemap placeholder.

## Requirements
- Node.js 20.9+
- Supabase project
- GitHub repository and Vercel project

## Run locally
```bash
npm install
cp .env.example .env.local
# Fill in Supabase URL and anon/publishable key
npm run dev
```
Open http://localhost:3000.

## Supabase setup
1. Open Supabase SQL Editor.
2. Run `supabase/schema.sql`.
3. Create the owner user in Supabase Authentication. Use an email address that you control.
4. Create the matching row in `public.profiles` and set `role='owner'` using the SQL comments at the end of the schema.
5. Add other users through Supabase Auth. Insert their profiles with role `strategist`, `player` or `member`.
6. Never place the Supabase `service_role` key in a `NEXT_PUBLIC_` variable or frontend code.

The supplied username `Junior` is intended as the profile username, not as a standalone insecure login. The password shared in chat is not embedded in this project. Set a fresh, unique password in Supabase Auth and enable MFA where available. Do not use a security question as account recovery; use verified email recovery and MFA.

## Vercel deployment
1. Push this folder to GitHub.
2. In Vercel choose **Add New → Project**, import the GitHub repository.
3. Framework preset: Next.js (automatic).
4. Add these Environment Variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your actual `*.vercel.app` address)
5. Deploy. After changing environment variables, redeploy.
6. In Supabase Authentication URL Configuration, add your Vercel deployment URL to Site URL / Redirect URLs.

No custom domain is required. The site runs on the Vercel-provided domain.

## Important limitations before public launch
This is a functional starter, not a finished production organization platform:
- Match, news, player, stats and profile editing screens need their complete CRUD workflows connected to the corresponding tables.
- Recruitment form currently validates client-side only; connect a server-side endpoint or Supabase insert with anti-spam controls before accepting applications.
- Strategy save is connected to Supabase and protected by database RLS. The current map visualizer is a placeholder canvas: add authorized, accurate map images and validated map callouts/rotation data. Do not treat the sample map list as a verified current competitive pool.
- PNG export is currently SVG export (browser-native). Convert SVG to PNG if PNG is mandatory.
- Riot Account linking/API access is not implemented. Never collect Riot passwords.
- Legal pages are initial templates, not legal advice. Add controller identity, contact details, legal basis, retention schedule, processor information, cookie details and data-subject rights contact. Obtain GDPR/legal review before launch.
- No live Riot API integration or real match/stat data is included.
- No file/object storage is used. Profile photos and article images must be hosted elsewhere and referenced by URL.

## Security
- Do not commit `.env.local`.
- Never hardcode credentials.
- Admin authorization is enforced by Supabase RLS for strategies; frontend role checks are only UI feedback.
- Create the owner account in Supabase Auth, then assign `owner` in `profiles`. The initial owner role should be assigned manually by the project owner.
