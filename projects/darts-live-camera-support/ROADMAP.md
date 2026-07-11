# Roadmap — Darts Live Camera Support

## Product direction

Build a professional, TV-friendly darts scoring system for cafés, dart clubs, small tournaments, and pilot users.

The commercial sequence is deliberate:

1. reliable human-confirmed scoreboard;
2. premium demo and operator workflow;
3. real pilot feedback;
4. camera feasibility;
5. only then semi-automatic recognition.

The project must not present mock snapshots or human confirmation as automatic visual recognition.

## Current position

Completed:

- commercial framing and MVP definition;
- Next.js/TypeScript/Tailwind foundation;
- two-player 301/501 scoreboard;
- score validation, bust, exact-zero finish, and switching;
- history, correction, and undo;
- mock image references;
- Codespaces and GitHub Actions build support;
- shared premium design foundation;
- corrected TV scoreboard grid.

Active work:

- **Sprint 2.2.2.2 — Responsive TV layout & kiosk mode** via issue #25.

See `SPRINTS.md` for the detailed sprint sequence and `AGENTS.md` for the standard agent workflow.

## Milestone A — Premium scoreboard demo

Goal: make the current human-confirmed product convincing and reliable for a non-technical demo.

### A1 — Design foundation

Status: complete.

Delivered:

- shared visual tokens and UI primitives;
- premium score cards;
- obvious active-player state;
- TV-readable score hierarchy.

### A2 — Responsive TV layout & kiosk mode

Status: active.

Deliver:

- robust desktop/16:9 layout;
- deliberate tablet/mobile layout;
- no horizontal overflow;
- touch-friendly operator controls;
- safe fullscreen enter/exit and fallback.

### A3 — Motion & live-state feedback

Deliver:

- restrained score transitions;
- active-player and bust feedback;
- stable layout;
- reduced-motion support.

### A4 — Finish overlay & winner presentation

Deliver:

- premium winner state;
- clear close/return behaviour;
- responsive presentation without heavy dependencies.

### A5 — Demo QA & accessibility

Deliver:

- contrast, focus, keyboard, and touch review;
- long-name and edge-state testing;
- cross-browser/fullscreen fallbacks;
- complete regression and demo screenshots.

Exit criteria:

- parent premium-design issue #22 complete;
- green build and CI;
- desktop, TV, tablet, and mobile smoke tests pass;
- demo can be shown without developer explanation.

## Milestone B — Pilot-ready workflow

Goal: produce the smallest version worth testing in a real café or dart club.

### B1 — Operator workflow & match controls

Potential scope:

- clearer match reset/new-leg flow;
- practical operator navigation;
- separation between TV view and operator actions;
- error-recovery workflow.

### B2 — Online preview deployment

Potential scope:

- deploy the demo to a reviewable environment;
- document startup and demo flow;
- keep infrastructure minimal and reversible.

### B3 — Pilot validation

Test with cafés, clubs, or realistic proxies.

Measure:

- setup time;
- scoring speed;
- correction frequency;
- readability at distance;
- operator confusion;
- perceived value and willingness to test or pay.

Exit criteria:

- evidence that the scoreboard solves a meaningful problem;
- prioritized pilot feedback;
- explicit decision whether camera work is commercially justified.

## Milestone C — Camera feasibility

Start only after Milestone B has produced positive evidence.

### C1 — Camera feasibility spike

Goal: determine whether a stable camera setup can produce useful before/after images without committing to full recognition.

Investigate:

- browser camera access;
- fixed mounting and framing;
- lighting variation;
- image capture timing;
- privacy and storage decisions;
- reliable human confirmation.

Output:

- smallest viable camera architecture;
- test images and failure cases;
- hardware assumptions;
- risk and cost estimate;
- go/no-go for calibration.

### C2 — Board calibration

Potential future scope:

- board centre and rotation;
- ring and number-segment mapping;
- saved setup calibration;
- lens/perspective handling.

## Milestone D — Semi-automatic scoring

Start only after camera capture and calibration are demonstrably reliable.

Potential scope:

- before/after image comparison;
- dart-candidate detection;
- coordinate-to-segment mapping;
- confidence score;
- human confirmation/correction;
- error and training-data logging.

The human remains the final decision-maker until field evidence proves otherwise.

## Milestone E — Productization

Possible commercial paths:

- setup and installation service;
- hosted scoreboard subscription;
- event/competition package;
- hardware bundle with camera, mount, mini-PC, and software;
- reusable white-label operator/TV system.

Choose a package only after pilot evidence reveals who pays, for what outcome, and under which operating conditions.

## Immediate next step

Complete issue #25 on `feature/darts-responsive-kiosk`, validate it, publish a draft PR, and merge only after explicit user approval.

Do not start motion, winner presentation, deployment, or camera work inside issue #25.
