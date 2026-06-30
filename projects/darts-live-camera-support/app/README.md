# Darts Live Camera Support — Scoreboard Prototype

This app is the Phase 1 scoreboard prototype for the Darts Live Camera Support project.

## Goal

Build a browser-based 301/501 darts scoreboard prototype with:

- two-player match setup;
- live score display;
- score input;
- bust and finish handling;
- turn history;
- correction flow;
- mock image panel for assisted scoring.

## Tech direction

Planned stack:

- Next.js
- TypeScript
- Tailwind CSS
- Local state first
- No backend required for Phase 1

## Local setup

This scaffold defines the intended app structure. The actual install command can be finalized when the package files are added.

Expected commands later:

```bash
npm install
npm run dev
```

## Folder structure

```text
app/
  README.md
  package.json
  next.config.ts
  tsconfig.json
  tailwind.config.ts
  postcss.config.js
  src/
    app/
      globals.css
      page.tsx
    components/
      MatchSetup.tsx
      Scoreboard.tsx
      ScoreInput.tsx
      TurnHistory.tsx
      MockImagePanel.tsx
    domain/
      types.ts
      scoring.ts
    data/
      demoData.ts
```

## Phase 1 constraints

Do not add yet:

- real camera input;
- image recognition;
- OpenCV;
- database;
- auth;
- payments;
- tournament brackets.

The priority is a working, demoable scoreboard prototype.
