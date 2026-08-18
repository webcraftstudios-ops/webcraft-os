# Sprints — Darts Live Camera Support

## Current status

Integration branch:

```text
project/darts-live-camera-support
```

Current product mode:

- two-player 301/501;
- human-confirmed scoring;
- browser-camera and local RTSP snapshot capture;
- snapshot-to-turn history linkage;
- premium TV-friendly presentation;
- automatic recognition not integrated into the production application.

There is currently **no automatically authorized implementation sprint**. The next issue must be selected explicitly after governance and product review.

## Completed work

### Phase 0 — Commercial and technical framing

Completed:

- target users and problem framing;
- MVP and explicit non-goals;
- Next.js/TypeScript/Tailwind direction;
- human-confirmed camera-assisted workflow;
- demo and validation plan.

### Phase 1 — Core scoreboard

Completed:

- match setup for two players;
- 301/501 selection;
- score validation and subtraction;
- player switching;
- bust and exact-zero finish;
- turn history;
- correction and undo.

### Premium demo and operator foundation

| Work | Status | GitHub reference | Result |
|---|---|---|---|
| Design foundation | Completed | PR #24 | Shared tokens, UI primitives, premium TV-readable layout |
| Responsive TV layout and kiosk mode | Completed | Issue #25, PR #27 | Desktop/TV layout, mobile stacking, fullscreen support |
| GitHub Pages demo deployment | Completed | PR #28 | Static demo deployment workflow |
| Premium visual design and winner overlay | Completed | Issue #22, PR #31 | Active-player treatment and finished-match presentation |
| Scoring-domain tests | Completed | Issue #32, PR #33 | Automated coverage for validation, bust, finish, correction, and undo |
| Match setup and configuration | Completed | Issue #36, PR #37 | Player names and 301/501 setup flow |

### Camera-assisted workflow

| Work | Status | GitHub reference | Result |
|---|---|---|---|
| Mock camera preview and linkage | Completed | Issue #34, PR #35 | Snapshot evidence linked to turns |
| Browser camera capture | Completed | Issue #38, PR #39 | `getUserMedia` snapshot capture |
| Real IP camera via RTSP bridge | Completed | Issue #46, PR #47 | Local ffmpeg bridge, C100 hardware acceptance, error recovery, credential isolation |

Sprint 2.7 was accepted with an explicit hardware waiver: the physical end-to-end test used a Tapo C100 using the same local Tapo RTSP mechanism. A physical C110 test remains advisable before guaranteeing the C110 as bundled pilot hardware, but it is not an open software-sprint blocker.

### Computer-vision feasibility spikes

| Work | Status | GitHub reference | Evidence level |
|---|---|---|---|
| Perspective correction and coordinate-to-score mapping | Spike completed | PR #42 | Feasibility demonstrated with controlled image input |
| Image subtraction and dart candidate isolation | Spike completed | PR #44 | Feasibility demonstrated with test images |

These spikes are not production automatic recognition. They do not authorize integration into the main application without a new issue, architecture review, failure criteria, and human-confirmation safeguards.

## Current governance gate

Before starting more implementation:

1. confirm that existing open issues still match the current product state;
2. choose one issue as the next commercial or operational priority;
3. define the smallest testable scope and explicit non-goals;
4. assign one branch and one executing agent;
5. define automated, manual, hardware, and security checks before editing.

## Candidate next issues

### Issue #40 — Reset match flow after win

Type: small pilot-readiness improvement.

Potential value:

- removes the need to refresh after a completed match;
- improves café/club demo continuity;
- keeps camera cleanup and undo behaviour explicit.

This is the smaller and lower-risk implementation candidate.

### Issue #45 — OpenCV setup and calibration UI

Type: larger experimental integration.

Required before start:

- confirm that calibration integration is commercially justified now;
- separate spike code from production architecture;
- define browser performance and asset-loading constraints;
- define calibration persistence and reset behaviour;
- preserve manual scoring as the final decision path;
- add explicit failure and fallback criteria.

Do not start issue #45 merely because the feasibility spikes succeeded.

## Standard execution flow

```text
issue selection and acceptance criteria
→ orientation and branch safety
→ scoped implementation
→ issue-specific specialist review
→ automated and manual regression QA
→ APPROVE FOR PR or CHANGES REQUIRED
→ draft PR
→ explicit human merge approval
```

Project-specific rules are defined in `AGENTS.md`. One active issue and one feature branch remain the default unit of work.
