# Prestige HOA

Next.js 16 (App Router) + Sanity v6. A port of the `Prestige HOA.html` design
prototype into real routes, with every piece of copy editable in Sanity.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

The Studio is embedded at [`/studio`](http://localhost:3000/studio).

### Sanity setup (one time)

1. Add CORS origins at [sanity.io/manage](https://www.sanity.io/manage) →
   project `hyl3j71t` → **API → CORS origins**. Add `http://localhost:3000`
   **with credentials**, plus your deployed origin. Without this the Studio
   loads but cannot sign in.
2. `npx sanity login`
3. `npm run sanity:seed` — pushes the copy in `src/content/defaults.ts` into
   the dataset and uploads the seven photographs, so the Studio opens with the
   live wording already in it.

## How content works

Content flows through two layers:

- **`src/content/defaults.ts`** holds the launch copy, typed by
  `src/content/types.ts`. This ships with the build.
- **Sanity** overrides it. `src/sanity/lib/content.ts` fetches every singleton
  in one query and merges it over the defaults.

A field left empty in the Studio falls back to its default, so the site can
never render blank. Arrays are different: a non-empty array from Sanity
decides the result — removing a nav item in the Studio removes it from the
site — while each entry still merges over the default at the same index, so a
pathway whose image was never uploaded keeps the shipped photograph.

If Sanity is unreachable the page logs and renders the defaults rather than
failing.

### Documents

Every document is a singleton, one per site:

| Document | Route |
| --- | --- |
| Site settings | header, footer, brand, contact details |
| Home | `/` |
| About | `/about` |
| Payments | `/payments` |
| Homeowner payment | `/payments/homeowner` |
| Title company portal | `/title-company` |
| Concierge support | `/contact` |

After changing a schema, regenerate query types:

```bash
npm run sanity:typegen
```

## Design system

`src/app/globals.css` carries the tokens ported from the prototype's
"Modernist" system with the navy/gold theme applied: `--color-bg #0a1020`,
`--color-accent #c9a24a`, `--color-text #f1e9d6`, Archivo, zero border radius.
Component classes (`.btn`, `.input`, `.card`, `.table`, `.framed`, `.kicker`)
match the original's markup so sections port one-to-one.

`src/components/Motion.tsx` reproduces the scroll/pointer parallax and the
scroll-reveal. Elements are only hidden once it runs, and it no-ops under
`prefers-reduced-motion`.

## Not yet connected

These were placeholders in the prototype and remain so:

- **Homeowner payment, steps 2–3.** The assessment table shows "Loaded from
  account system once connected". The final button stays disabled until
  **Homeowner payment → Step 3 → Payment partner URL** is set in the Studio,
  at which point it becomes a live link.
- **Title company request form.** Submitting shows the confirmation state; no
  endpoint is called. Field groups are editable in the Studio.
- **Concierge contact form.** Same — confirmation only, no endpoint.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run sanity:typegen` | Regenerate `sanity.types.ts` from the schema |
| `npm run sanity:seed` | Push `defaults.ts` into the dataset |
| `npm run sanity:deploy` | Deploy the Studio to sanity.studio |
