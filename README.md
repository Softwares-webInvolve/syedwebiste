# Syed Mustahsan — Timeless Tales

A poetic, shader-driven author website. *Chronicles of love, loss, and adventure
from the misty valleys of Kashmir.*

Built with **React + TypeScript + Vite**, a custom **WebGL fluid-paint hero**
(Three.js), **GSAP ScrollTrigger** parallax, a custom cursor, and **react-router v7**
work-detail pages — all driven from a single content file.

## Stack
- **Vite 6** + **React 18** + **TypeScript** (strict)
- **three** — WebGL "liquid paint" hero shader (`src/sections/FluidSubconscious.tsx`)
- **gsap** / ScrollTrigger — gallery reveal + parallax
- **react-router-dom v7** — `/` home, `/work/:id` book detail pages (auto-generated from config)

## Edit content — one file
All copy, books, links, and labels live in **`src/config.ts`**. The components
read from it; you should not need to touch component files to update content.

## Assets
Real, freely-licensed images/video from Wikimedia Commons live in
`public/images/` and `public/videos/`. See `public/images/README.md` for the
source manifest and the original art-direction prompt per file. To upgrade to
bespoke art, replace a file with the same name — no code change required.

Re-fetch helpers (optional): `node scripts/fetch-images.mjs` and
`node scripts/fetch-fix.mjs`.

## Develop / build
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
npm run preview    # serve the production build
```

## Deploy (static)
Deploy the `dist/` folder to any static host. SPA deep-link fallbacks are
included for **Netlify** (`public/_redirects`) and **Vercel** (`vercel.json`).
For GitHub Pages, add a `404.html` copy of `index.html` (or use hash routing).

## Deploy with Docker / Easypanel
A multi-stage `Dockerfile` builds the site and serves it with nginx
(SPA routing + gzip + asset caching). **The container listens on port `8080`**
(not 3000).

Local test:
```bash
docker compose up --build      # → http://localhost:8080
# or
docker build -t timeless-tales .
docker run -p 8080:8080 timeless-tales
```

### Easypanel
1. Create a new **App** service and point it at this Git repo
   (`Softwares-webInvolve/syedwebiste`, branch `main`).
2. Build method: **Dockerfile** (it's in the repo root — no extra config).
3. Set the service **Port** to **`8080`** to match the container.
4. Add your **Domain** in Easypanel and deploy. Pushes to `main` can trigger
   redeploys.

> Changing the port? Edit it in **both** `Dockerfile` (`EXPOSE`) and
> `nginx.conf` (`listen`), then set the same value in Easypanel.

## Notes
- Custom cursor is active on all routes; it auto-hides on touch devices. To force
  mobile-first, remove `<CustomCursor />` from `src/App.tsx`.
- Hero shader distortion strength: `uIntensity` (0.6 desktop / 0.4 mobile) in
  `FluidSubconscious.tsx`.
