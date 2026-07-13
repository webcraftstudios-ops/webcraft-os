# Roadmap — Darts Live Camera Support

## Product direction

Build a professional, TV-friendly darts scoring system for cafés, dart clubs, small tournaments, and pilot users.

The product is currently **camera-assisted and human-confirmed**. Browser and RTSP cameras provide visual evidence, but the operator remains responsible for score confirmation. Computer-vision experiments must not be presented as reliable automatic scoring.

## Current product state

Delivered on `project/darts-live-camera-support`:

- two-player 301/501 match setup;
- score validation, subtraction, switching, bust, and exact-zero finish;
- turn history, correction, and undo;
- premium responsive scoreboard and winner presentation;
- fullscreen/kiosk support;
- automated scoring-domain and camera-flow tests;
- browser-camera capture;
- local RTSP-to-JPEG bridge for a fixed IP camera;
- snapshot-to-turn evidence linkage;
- bridge offline/camera offline handling and recovery;
- localhost binding, restricted CORS, and bridge-side credential isolation;
- GitHub Actions build/test coverage and GitHub Pages demo deployment.

Hardware acceptance for Sprint 2.7 used a physical Tapo C100. The same local Tapo Camera Account RTSP mechanism is expected on the C110, but a physical C110 test is still required before guaranteeing that exact model as a standardized commercial hardware bundle.

## Experimental evidence already available

Two standalone OpenCV spikes have been completed:

1. perspective correction and coordinate-to-score mapping;
2. before/after image subtraction and dart-candidate isolation.

These prove that individual technical steps are feasible under controlled conditions. They do not yet prove:

- stable operation across lighting and camera angles;
- reliable dart-tip localization;
- multi-dart turn handling;
- acceptable false-positive and false-negative rates;
- calibration persistence in the application;
- production browser performance;
- field reliability in cafés or clubs.

## Milestone A — Stabilize the pilot workflow

Goal: make repeated real-world use reliable before expanding recognition scope.

Potential work:

- reset/new-match flow after a win;
- camera and browser-resource cleanup between matches;
- setup documentation for non-technical operators;
- explicit hardware support matrix;
- failure-recovery checklist;
- long-session and repeated-match testing.

Candidate issue: **#40 — Reset match flow after win**.

Exit criteria:

- an operator can start, complete, reset, and restart matches without refreshing;
- scoring, correction, undo, and snapshot linkage remain reliable;
- camera resources recover cleanly;
- the workflow can be demonstrated without developer intervention.

## Milestone B — Pilot validation

Goal: gather evidence that the system solves a meaningful operational or presentation problem.

Test with cafés, clubs, small events, or realistic proxy users.

Measure:

- setup time;
- match-start and reset friction;
- scoring speed;
- correction frequency;
- readability at distance;
- camera reliability;
- operator confusion;
- perceived value;
- willingness to pilot or pay.

Exit criteria:

- at least one realistic repeated-use session;
- prioritized operator feedback;
- evidence for the highest-value next improvement;
- explicit decision whether automatic score proposals are commercially justified.

## Milestone C — Calibration integration

Start only through an explicit scoped issue. Issue #45 is a candidate, not an automatically active sprint.

Smallest acceptable integration scope:

- load OpenCV without blocking the application;
- capture or select an empty-board baseline;
- collect four perspective points;
- preview the normalized board;
- store and reset calibration state;
- show clear failure and fallback states;
- keep manual score entry fully available.

Before implementation, define:

- performance budget;
- supported browsers and devices;
- calibration lifecycle;
- data persistence boundary;
- acceptance images and failure cases;
- whether this produces enough pilot value to justify maintenance cost.

## Milestone D — Assisted score proposal

Start only after calibration is reproducible and pilot evidence supports the investment.

Potential scope:

- before/after image comparison;
- dart-candidate detection;
- coordinate-to-segment mapping;
- confidence and uncertainty display;
- operator confirmation or correction;
- error logging and reproducible test fixtures.

The system must remain human-confirmed until field evidence demonstrates sufficient reliability. Never silently apply a detected score to match state.

## Milestone E — Productization

Choose a commercial package only after pilot evidence identifies the buyer and operating model.

Possible paths:

- setup and installation service;
- hosted scoreboard subscription;
- event or competition package;
- hardware bundle with camera, mount, mini-PC, and software;
- white-label operator and TV-display system.

For a hardware bundle, validate the exact camera model, firmware behaviour, mounting assumptions, local-network setup, and support burden before making a standard recommendation.

## Immediate governance step

Do not begin a new implementation automatically.

Next:

1. close completed and superseded issues where evidence supports closure;
2. select one active issue;
3. define its commercial purpose, smallest sellable or testable result, and non-goals;
4. assign a dedicated branch and executing agent;
5. define automated, manual, hardware, and security acceptance gates.

For the smallest low-risk pilot improvement, assess issue #40 before starting the larger calibration integration in issue #45.
