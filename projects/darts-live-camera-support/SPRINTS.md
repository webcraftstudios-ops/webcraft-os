# Sprints — Darts Live Camera Support

## Current status

The project has completed its commercial framing, MVP definition, technical foundation, core scoreboard prototype, correction/undo flow, mock image support, Codespaces/CI setup, and the first premium visual-design sprint.

Current integration branch:

```text
project/darts-live-camera-support
```

Current product mode:

- two-player 301/501;
- human-confirmed scoring;
- mock snapshot references;
- premium TV-friendly demo;
- automatic camera recognition deliberately deferred.

## Completed milestones

### Phase 0 — Definition and go/no-go

Completed:

- commercial target and value hypothesis;
- MVP and explicit non-goals;
- technical stack and architecture direction;
- demo and validation plan.

### Phase 1 — Scoreboard prototype

Completed:

- match setup for two players;
- 301/501 selection;
- score validation and subtraction;
- player switching;
- bust and exact-zero finish;
- turn history;
- undo and score correction;
- mock image linkage;
- build workflow and Codespaces support.

### Sprint 2.2.2.1 — Design foundation

Status: completed and merged through PR #24.

Delivered:

- shared design tokens;
- reusable UI primitives;
- premium scoreboard styling;
- TV-readable scores and active-player state;
- corrected three-column player/turn/player layout.

## Active sprint

### Sprint 2.2.2.2 — Responsive TV layout & kiosk mode

GitHub issue: #25

Branch:

```text
feature/darts-responsive-kiosk
```

Goal:

Make the premium demo robust on desktop, 16:9 TV, laptop, tablet, and mobile, with a safe browser-fullscreen mode.

Scope:

- preserve `Player 1 | Current turn | Player 2` on wide screens;
- improve 16:9 spacing and scanability;
- define deliberate tablet/mobile stacking;
- prevent horizontal overflow;
- keep controls touch-friendly;
- add defensive fullscreen enter/exit behaviour and fallback;
- preserve all existing score behaviour.

Explicit non-goals:

- animations;
- winner overlay;
- camera recognition;
- backend or authentication;
- new game modes or rules;
- deployment.

Definition of Done:

- responsive smoke tests pass;
- fullscreen opens and exits safely;
- operator controls remain usable;
- no score/name clipping;
- existing functional flows remain intact;
- `npm run build` and GitHub Actions succeed;
- draft PR is created but not merged without user approval.

## Planned premium-design sprints

### Sprint 2.2.2.3 — Motion & live-state feedback

Start only after Sprint 2.2.2.2 is merged.

Scope:

- restrained score-update feedback;
- clear active-player transition;
- short bust/status feedback;
- stable layout during transitions;
- `prefers-reduced-motion` support.

Not in scope:

- winner overlay;
- sound;
- new rules;
- camera functionality.

### Sprint 2.2.2.4 — Finish overlay & winner presentation

Start only after Sprint 2.2.2.3 is merged.

Scope:

- premium finished-match state;
- clear winner presentation;
- close/return behaviour;
- TV, tablet, and mobile compatibility;
- no heavy celebration dependency.

### Sprint 2.2.2.5 — Premium demo QA & accessibility

Start only after Sprint 2.2.2.4 is merged.

Scope:

- contrast and readability;
- keyboard and focus behaviour;
- touch targets;
- long names and extreme UI states;
- fullscreen/browser fallbacks;
- final cross-viewport regression;
- demo screenshots and remaining style cleanup.

When complete, parent issue #22 — Premium visual design — may be closed after final validation.

## Next commercial phase: pilot-ready demo

After Sprint 2.2.2.5, hold a product go/no-go review before computer-vision work.

Proposed sequence:

1. **2.3.1 — Operator workflow & match controls**
2. **2.3.2 — Online preview deployment**
3. **2.3.3 — Café/dart-club pilot feedback**
4. **2.3.4 — Camera feasibility spike**

The camera feasibility spike begins only after the scoreboard workflow has demonstrated real user value.

## Standard execution flow

Each implementation sprint uses this sequential gate:

```text
orientation and scope
→ implementation
→ sprint-specific specialist pass
→ independent regression QA
→ draft PR
→ explicit human merge approval
```

Project-specific details are defined in `AGENTS.md`. One active issue and one feature branch remain the default unit of work.
