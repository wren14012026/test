# test

## GitHub Pages deployment ✅

This repository is configured to build a static SPA and deploy to GitHub Pages.

How it works:

- Run `npm run build:ghpages` to produce a `docs/` folder (Vite will set the base to `/test/`).
- A GitHub Action (`.github/workflows/gh-pages.yml`) builds on push to `main` and deploys `docs/` to the `gh-pages` branch.

Local quickstart:

1. npm ci
2. npm run build:ghpages
3. Preview the `docs/` folder (e.g., `npx serve docs` or open `docs/index.html` in the browser).

Notes:

- This publishes only the frontend as a static site (Laravel/PHP backend is not hosted on GitHub Pages).
- Client-side routing is supported by having `404.html` load the SPA so the app can handle navigation on unknown routes.
