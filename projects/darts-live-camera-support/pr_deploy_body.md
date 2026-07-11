**Active issue / Sprint**: Setup GitHub Pages Deployment

**Product Objective**:
Enable automated zero-cost deployment to GitHub Pages for fast iteration and MVP demos with pilot users.

**Implementation Summary**:
- Configured `next.config.ts` for static exports (`output: 'export'`) with unoptimized images.
- Added `basePath` handling dynamically via `NEXT_PUBLIC_BASE_PATH` environment variable.
- Created a GitHub Actions workflow (`.github/workflows/darts-gh-pages.yml`) that builds the Next.js app and automatically deploys the `out/` folder to GitHub Pages.

**Changed Files**:
- `projects/darts-live-camera-support/app/next.config.ts`
- `.github/workflows/darts-gh-pages.yml` (new)

**Known Limitations / Risks**:
- Next.js Image Optimization is disabled (unsupported on standard static exports).
- Any API Routes (`/api`) inside Next.js will not work on GitHub Pages, ensuring we strictly maintain the frontend-only MVP scope for now.