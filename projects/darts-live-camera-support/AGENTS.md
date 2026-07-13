# Darts Live Camera Support — Project Agent Rules

This file adds Darts-specific rules below the repository root `AGENTS.md`. The root constitution remains authoritative for repository safety, Git discipline, scope control, secrets, dependencies, validation honesty, and collaboration.

## 1. Product mode

Build a reliable, premium, TV-friendly darts scoring system for cafés, dart clubs, small tournaments, and pilot users.

Current production mode:

- two-player 301/501 scoring;
- human-confirmed score entry;
- browser-camera and local RTSP snapshot evidence;
- no claim of automatic visual recognition;
- OpenCV work remains experimental until an explicit integration issue is approved.

## 2. Project boundaries

Project root:

```text
projects/darts-live-camera-support/
```

Application root:

```text
projects/darts-live-camera-support/app/
```

Stable integration branch:

```text
project/darts-live-camera-support
```

Use one dedicated feature branch per issue. Never implement directly on the integration branch. Draft pull requests must target the integration branch and may not be merged without explicit user approval.

## 3. Mandatory orientation

Before editing, follow the root `AGENTS.md` orientation and additionally inspect:

- the active GitHub issue;
- this file;
- the relevant section of `SPRINTS.md` and `ROADMAP.md`;
- all source files and tests directly involved;
- whether another agent is already working on the same branch or files.

Report:

- objective and acceptance criteria;
- explicit non-goals;
- expected changed files;
- protected files;
- validation commands;
- technical and operational risks;
- stop conditions.

## 4. Sequential execution workflow

Every implementation issue follows one controlled sequence on one feature branch:

1. **Sprint Gatekeeper** — confirm issue, branch, scope, risks, affected files, and validation plan.
2. **Implementer** — make only the approved local change using existing architecture and conventions.
3. **Specialist Pass** — perform the issue-specific review, such as UI/accessibility, scoring, camera, RTSP bridge, OpenCV, security, or deployment.
4. **Regression Gatekeeper** — inspect the final diff and execute applicable automated and manual checks.
5. **Branch & PR Publisher** — create a focused commit and update or open a draft PR only after a positive QA verdict.

Do not run multiple agents or worktrees that modify the same files for the same issue. Parallel work requires separate branches or explicitly non-overlapping files.

## 5. Protected game behaviour

Do not change game behaviour unless the active issue explicitly authorizes it. Preserve:

- valid turn score range;
- score subtraction;
- player switching;
- bust behaviour;
- exact-zero finish;
- correction and undo;
- history consistency;
- 301/501 selection;
- snapshot-to-turn linkage.

Keep game and scoring logic separate from React presentation.

During visual or camera-only work, normally treat these as protected:

```text
app/src/domain/scoring.ts
app/src/domain/types.ts
package.json
package-lock.json
.github/workflows/
```

A necessary exception must be stated before modification and covered by targeted tests.

## 6. Camera and recognition boundaries

Camera capture, recognition, score confirmation, persistence, and presentation must remain separable concerns.

The browser application may communicate with the local RTSP bridge only through its HTTP snapshot endpoint. Camera RTSP URLs and credentials must remain bridge-side and must never be committed or exposed through browser-visible environment variables.

For the RTSP bridge:

- bind to `127.0.0.1` by default;
- restrict CORS to the configured application origin;
- treat LAN exposure as an explicit security-sensitive opt-in;
- preserve graceful offline, timeout, and recovery behaviour.

OpenCV spikes prove technical feasibility only. Do not present spike output as production-ready automatic scoring. Calibration, detection, confidence scoring, and automatic score proposals require separate scoped issues and acceptance criteria.

## 7. Scope control

Implement only the active issue. Do not silently add:

- new game rules;
- automatic recognition;
- databases, authentication, or payments;
- tournament logic;
- cloud camera streaming;
- unrelated deployment work;
- dependencies or refactors not required by the issue.

Classify discovered work as:

- `BLOCKING`;
- `SHOULD FIX`;
- `FUTURE ISSUE`.

Only blocking, in-scope defects may be included before publication. Everything else becomes a separate issue or recommendation.

## 8. Validation matrix

Run only checks applicable to the changed area, but do not omit a required gate.

### Darts application changes

From `projects/darts-live-camera-support/app`:

```bash
npm install
npm run test:coverage
npm run build
```

Use `npm ci` in clean CI environments when the lockfile is valid.

Applicable manual regression checks include:

- match setup and 301/501 selection;
- normal and invalid score input;
- player switching;
- bust and exact-zero finish;
- correction and undo;
- snapshot capture, discard, confirmation, and turn-history linkage;
- responsive and fullscreen behaviour;
- offline/error recovery.

### RTSP bridge changes

From `projects/darts-live-camera-support/tools/rtsp-snapshot-bridge`:

```bash
node --test
```

Also verify applicable operational behaviour:

- localhost binding;
- restricted CORS;
- bridge-offline and camera-offline errors;
- recovery without restarting the application;
- credentials remain bridge-side.

### OpenCV spike changes

Document:

- input images and assumptions;
- manual or automated reproduction steps;
- observed result;
- failure cases;
- why the result is a spike rather than production acceptance.

Never claim a check passed unless it was actually executed or explicitly confirmed by the user.

## 9. Completion report

Every implementation session ends with:

```text
Status:
Issue:
Branch:
Commit:
Scope completed:
Files changed:
Validation executed:
Automated result:
Manual checks:
Security or privacy checks:
QA verdict:
Known limitations:
Deferred items:
Recommended next issue:
PR number and URL:
CI status:
```

The final QA verdict must be either:

```text
APPROVE FOR PR
```

or:

```text
CHANGES REQUIRED
```
