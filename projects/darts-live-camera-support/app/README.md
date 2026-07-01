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

Run from this folder:

```bash
npm install
npm run dev
```

Then open the local Next.js URL shown in the terminal.

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
      CorrectionControls.tsx
      MatchSetup.tsx
      MockImagePanel.tsx
      Scoreboard.tsx
      ScoreInput.tsx
      TurnHistory.tsx
    domain/
      types.ts
      scoring.ts
    data/
      demoData.ts
```

## Demo flow

Use this flow for a short café or club demo.

1. Open the app.
2. Enter two player names, or keep the defaults.
3. Keep 501 selected.
4. Start the match.
5. Show both players on 501.
6. Create a mock image.
7. Enter score 60 for player 1.
8. Confirm that player 1 drops to 441 and the mock image is linked in history.
9. Enter score 45 for player 2.
10. Show turn history with both turns.
11. Correct the last score from 45 to 41.
12. Show that scores and history update.
13. Undo the last turn.
14. Show that the previous score is restored.
15. Demonstrate bust with a score above the player’s remaining score.
16. Demonstrate finish by entering a score that reaches exact 0.

## Acceptance tests

### Test 1 — Start 501 match

Expected:

- two players can be entered;
- 501 is the default;
- both players start on 501;
- player 1 is current player.

### Test 2 — Normal score flow

Steps:

- player 1 enters 60;
- player 2 enters 45.

Expected:

- player 1 score becomes 441;
- player 2 score becomes 456;
- current player switches after each valid turn;
- both turns appear in history.

### Test 3 — Invalid score

Steps:

- enter -1;
- enter 181;
- enter a decimal score.

Expected:

- invalid scores are rejected;
- match state does not change;
- feedback message is shown.

### Test 4 — Bust

Steps:

- reduce a player to a low score;
- enter a score higher than remaining score.

Expected:

- bust message is shown;
- remaining score stays the same;
- turn appears in history as bust;
- player turn switches after the bust.

### Test 5 — Finish

Steps:

- reduce a player to an exact reachable score;
- enter that exact score.

Expected:

- match status becomes finished;
- winner is shown;
- score input is disabled.

### Test 6 — Correction

Steps:

- enter a score;
- correct the last score to another valid score.

Expected:

- score is recalculated;
- correction feedback is shown;
- corrected turn is reflected in current state.

### Test 7 — Undo

Steps:

- enter a score;
- click undo last turn.

Expected:

- last turn is removed;
- previous score is restored;
- current player returns to the player of the removed turn.

### Test 8 — Mock image panel

Steps:

- create mock image;
- enter a score;
- check turn history.

Expected:

- pending image reference is linked to the confirmed turn;
- pending image is cleared after confirmation;
- last linked image remains visible;
- turn history shows the image reference.

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
