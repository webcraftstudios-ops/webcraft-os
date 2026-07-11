# Darts Live Camera Support — Project Agent Rules

This file adds project-specific rules below the repository root `AGENTS.md`. It may tighten, but never weaken, repository safety, Git, validation, or scope-control rules.

## 1. Product objective

Build a reliable, premium, TV-friendly darts scoring demo for cafés, dart clubs, small tournaments, and pilot users.

Current product mode:

- human-confirmed scoring;
- mock or camera-assisted evidence;
- no claim of automatic visual recognition;
- commercial proof and pilot readiness before computer-vision R&D.

## 2. Source of truth

Use this priority order:

1. explicit user instruction for the current task;
2. active GitHub issue or sprint;
3. this project `AGENTS.md`;
4. repository root `AGENTS.md`;
5. project documentation;
6. current implementation and tests.

Surface conflicts before editing.

## 3. Standard Verdent workflow

Every implementation sprint follows one sequential workflow on one feature branch:

1. **Sprint Gatekeeper** — orientation, branch safety, scope, risks, validation plan;
2. **Frontend Implementer** — approved Next.js/TypeScript/Tailwind implementation;
3. **Specialist Pass** — sprint-specific technical review, such as responsive/fullscreen, motion, accessibility, or camera feasibility;
4. **Regression Gatekeeper** — independent diff review, build, and applicable functional checks;
5. **Branch & PR Publisher** — focused commit, push, and draft pull request after a positive QA verdict.

Do not run multiple agents or worktrees that modify the same files for the same sprint. Parallel work requires separate branches or explicitly non-overlapping files.

## 4. Mandatory orientation

Before editing, run and report:

```bash
git status
git branch --show-current
git log -1 --oneline
git fetch origin --prune
```

Then read:

- the repository root `AGENTS.md`;
- the active GitHub issue;
- this file;
- the relevant project documents and source files.

Report:

- sprint objective;
- explicit non-goals;
- expected changed files;
- protected or read-only files;
- technical risks;
- validation plan;
- any stop condition.

## 5. Branch and publication rules

Stable integration branch:

```text
project/darts-live-camera-support
```

Use one dedicated feature branch per issue. Never implement directly on the integration branch.

Publishing is permitted only after the regression verdict is:

```text
APPROVE FOR PR
```

Create a draft pull request targeting the integration branch. Never merge without explicit user approval.

## 6. Protected behaviour

Do not change game behaviour unless the active issue explicitly authorizes it. Preserve:

- score range validation;
- score subtraction;
- player switching;
- bust behaviour;
- exact-zero finish;
- correction and undo;
- history consistency;
- 301/501 selection.

Keep domain logic separate from React presentation.

Normally treat these files as read-only during visual sprints:

```text
app/src/domain/scoring.ts
app/src/domain/types.ts
package.json
package-lock.json
.github/workflows/
```

A necessary exception must be explained before modification.

## 7. Scope control

Implement only the active issue. Do not silently add:

- new game rules;
- real camera capture;
- OpenCV or AI recognition;
- backend, database, authentication, or payments;
- tournament logic;
- deployment;
- unrelated refactors or dependencies.

Classify discovered work as:

- `BLOCKING`;
- `SHOULD FIX`;
- `FUTURE SPRINT`.

Only blocking, in-scope defects may be fixed before publication. Other work becomes a separate issue or recommendation.

## 8. Engineering rules

- Use TypeScript strictly; do not bypass errors with `any` without justification.
- Reuse design tokens and shared UI primitives.
- Keep components focused and props explicit.
- Preserve keyboard, focus, and touch usability.
- Prefer browser/framework capabilities before adding dependencies.
- Client-only browser APIs must not execute during server rendering.
- Do not weaken or bypass CI.

## 9. Validation gate

Minimum build validation:

```bash
cd projects/darts-live-camera-support/app
npm install
npm run build
```

Run applicable manual checks for:

- match setup;
- 301/501 selection;
- normal score input;
- player switching;
- invalid score and bust;
- exact-zero finish;
- undo and correction;
- mock image linkage;
- turn history;
- responsive layout;
- fullscreen or other sprint-specific behaviour.

Never claim a check passed unless it was actually executed or explicitly confirmed by the user.

## 10. Completion report

Every implementation session ends with:

```text
Status:
Branch:
Commit:
Scope completed:
Files changed:
Validation executed:
Build result:
Manual checks:
QA verdict:
Known limitations:
Deferred items:
Recommended next sprint:
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
