# AGENTS.md — Webcraft OS Agent Constitution

This file defines the default operating rules for AI coding agents working in this repository, including Verdent, ChatGPT/Codex-style agents, and future automated contributors.

These rules apply repository-wide unless a more specific `AGENTS.md` exists deeper in a project directory. A nested file may add stricter project rules, but it must not weaken the safety, Git, validation, or scope-control rules below.

---

## 1. Repository purpose

`webcraft-os` contains multiple experiments, products, agent workflows, reusable tools, and commercial software projects.

The repository is not one monolithic application. Treat every folder under `projects/` as an independently scoped project unless its documentation explicitly says otherwise.

Before changing code, identify:

1. the active project;
2. the active issue or sprint;
3. the correct branch;
4. the files that are in scope;
5. the commands required to validate the change.

Never assume that a task for one project authorizes changes elsewhere in the repository.

---

## 2. Source of truth

Use the following priority order when instructions conflict:

1. explicit instruction from the user for the current task;
2. active GitHub issue or sprint definition;
3. nearest project-level `AGENTS.md`;
4. this repository-level `AGENTS.md`;
5. project documents such as `ROADMAP.md`, `MVP_SPEC.md`, `PHASE_*`, `SPRINTS.md`, and `README.md`;
6. existing implementation and tests.

Do not silently reinterpret product scope. Surface conflicts before implementation.

---

## 3. Mandatory orientation before editing

Before changing files, inspect and report:

```bash
git status
git branch --show-current
git log -1 --oneline
```

Then read the active project documentation and relevant source files.

For non-trivial work, provide a concise plan containing:

- objective;
- files to inspect;
- files expected to change;
- validation commands;
- explicit non-goals.

Do not begin a broad refactor before understanding the current structure.

---

## 4. Branch discipline

Never implement feature work directly on `main`, `main_n8n`, or another shared stable branch unless explicitly instructed.

Default workflow:

1. update the intended base branch;
2. create a dedicated feature branch;
3. implement only the active issue or sprint;
4. validate locally;
5. commit with a focused message;
6. push the feature branch;
7. open a pull request into the correct project branch.

For the Darts project, the stable integration branch is:

```text
project/darts-live-camera-support
```

Feature branches should follow a readable convention, for example:

```text
feature/darts-design-foundation
feature/darts-layout-refinement
feature/darts-camera-preview
fix/darts-score-correction
```

Do not merge into `main` or `main_n8n` unless explicitly approved.

---

## 5. Working-tree safety

Before editing:

- confirm the working tree is clean or explain existing changes;
- never discard user changes;
- never reset, clean, force-push, or rewrite history without explicit approval;
- do not modify unrelated files;
- do not include generated or temporary files unless required.

If unexpected changes appear, stop and report them before continuing.

---

## 6. Scope control

One active issue or sprint is the default unit of work.

Do not add adjacent features merely because they seem useful.

Every implementation report must separate:

- completed scope;
- deferred scope;
- newly discovered issues;
- recommended next sprint.

When a requested improvement would materially expand complexity, propose it as a separate issue instead of adding it silently.

---

## 7. Commercial product discipline

Prefer the smallest implementation that produces reliable proof, user value, a stronger demo, or a faster path to revenue.

Evaluate technical choices against:

- user problem solved;
- time saved;
- errors reduced;
- demo value;
- pilot readiness;
- maintainability;
- cost of future change.

Avoid technically impressive work that does not improve the current commercial milestone.

---

## 8. Darts Live Camera Support — product context

Project root:

```text
projects/darts-live-camera-support/
```

Application root:

```text
projects/darts-live-camera-support/app/
```

Current product direction:

> Build a professional, TV-friendly darts scoring system for cafés, dart clubs, small tournaments, and pilot users. The current product is human-confirmed and camera-assisted. Reliable automatic visual recognition is a later phase.

Current core capabilities include:

- two-player 301/501 match setup;
- live scoreboard;
- score entry and validation;
- player switching;
- bust handling;
- exact-zero finish;
- turn history;
- correction and undo;
- mock image references;
- TV/demo layout;
- shared design foundation;
- Codespaces and GitHub Actions build support.

The current priority is a reliable, premium demo and pilot-ready workflow, not premature computer-vision research.

---

## 9. Darts project mandatory reading

Before implementing a Darts sprint, inspect the relevant subset of:

```text
projects/darts-live-camera-support/README.md
projects/darts-live-camera-support/PROJECT_PROMPT.md
projects/darts-live-camera-support/MVP_SPEC.md
projects/darts-live-camera-support/ROADMAP.md
projects/darts-live-camera-support/SPRINTS.md
projects/darts-live-camera-support/PHASE_0_GO_NO_GO.md
projects/darts-live-camera-support/PHASE_1_COMPLETION_SUMMARY.md
projects/darts-live-camera-support/CODESPACES_WORKFLOW.md
projects/darts-live-camera-support/app/README.md
```

Also inspect the active GitHub issue and every source file directly involved in the change.

Do not rely only on a previous session summary.

---

## 10. Darts architecture rules

Maintain these boundaries:

- game and scoring logic stays independent of React UI;
- TypeScript domain types remain centralized;
- UI components receive explicit typed props;
- state transitions remain predictable;
- camera or recognition modules must not be embedded directly in scoreboard presentation components;
- persistence, camera input, recognition, and operator confirmation must remain separable concerns;
- shared styling belongs in design tokens or reusable primitives rather than duplicated class strings where practical.

Primary domain files:

```text
app/src/domain/types.ts
app/src/domain/scoring.ts
```

Do not move game rules into page components.

---

## 11. Darts game-rule protection

Do not alter existing game behavior without an explicit issue or approval.

Preserve at minimum:

- valid turn score range;
- score subtraction;
- player switching;
- bust behavior;
- exact-zero finish;
- correction behavior;
- undo behavior;
- match history consistency.

Features such as double-out, checkout suggestions, sets/legs, tournament brackets, and dart-by-dart input require their own scoped issue.

Never imply that automatic recognition is implemented when it is still simulated or human-confirmed.

---

## 12. Darts visual direction

The design direction is:

- premium sports-broadcast presentation;
- high contrast;
- readable from several metres away;
- large score numerals;
- obvious active-player state;
- minimal visual noise;
- clear separation between TV scoreboard and operator controls;
- responsive behaviour for laptop, tablet, and large display;
- restrained motion that supports comprehension.

Use existing design tokens and shared styles before introducing new visual conventions.

Do not copy third-party branding or create a confusing imitation of an existing broadcaster or darts organization.

---

## 13. Prohibited Darts scope without explicit approval

Do not add the following unless the active issue explicitly requires them:

- real camera capture;
- file upload pipelines;
- OpenCV;
- automatic dart detection;
- board calibration;
- AI score recognition;
- confidence-scoring pipelines;
- backend services;
- databases;
- authentication;
- payments;
- tournament brackets;
- streaming integrations;
- hardware purchasing logic;
- new game modes or rule variants.

When one of these becomes necessary, first propose architecture, smallest testable version, risks, and validation criteria.

---

## 14. Frontend engineering standards

For the Darts app:

- use TypeScript strictness rather than bypassing types;
- avoid `any` unless justified and documented;
- keep components focused;
- extract reusable primitives when repetition is meaningful;
- preserve accessible labels and keyboard behaviour;
- keep controls usable on touch devices;
- avoid unnecessary dependencies;
- prefer platform and framework capabilities before adding libraries;
- avoid hidden side effects;
- provide empty, loading, error, and finished states where relevant.

Do not suppress build or lint errors to make checks pass.

---

## 15. Dependency rules

Before adding a dependency, explain:

- why existing tools are insufficient;
- runtime or bundle impact;
- maintenance risk;
- licensing concerns if relevant;
- whether it is needed for the current sprint.

Do not upgrade major framework versions during an unrelated sprint.

Keep `package.json` and lockfiles consistent.

---

## 16. Validation requirements

For Darts app changes, run from:

```bash
cd projects/darts-live-camera-support/app
```

Minimum validation:

```bash
npm install
npm run build
```

Use `npm ci` instead of `npm install` in clean CI environments when a valid lockfile is present.

When relevant, also run:

```bash
npm run dev -- --hostname 0.0.0.0
```

Manual regression checks should cover the applicable flows:

- match setup;
- 301/501 selection;
- score entry;
- invalid-score handling;
- player switching;
- bust;
- exact-zero finish;
- correction;
- undo;
- mock image reference;
- turn history;
- responsive layout;
- TV readability.

Do not claim a check passed unless it was actually executed or explicitly confirmed by the user.

---

## 17. GitHub Actions and Codespaces

Codespaces configuration:

```text
.devcontainer/devcontainer.json
```

Darts build workflow:

```text
.github/workflows/darts-scoreboard-build.yml
```

Do not weaken, bypass, or remove CI checks to complete a sprint.

If CI differs from local execution, report the difference and fix the underlying cause.

---

## 18. Commit standards

Commits must be focused and understandable.

Recommended format:

```text
feat(darts): complete design foundation
feat(darts): add operator console layout
fix(darts): preserve score after correction
refactor(darts): extract shared panel primitive
test(darts): cover bust and finish transitions
docs(darts): define camera pilot architecture
```

Do not mix unrelated projects in one commit.

Do not include build output, caches, local environment files, or secrets.

---

## 19. Pull-request expectations

A pull request should state:

- active issue or sprint;
- product objective;
- implementation summary;
- changed files or areas;
- build and test results;
- screenshots for meaningful UI work;
- known limitations;
- deferred work;
- rollback or risk notes where relevant.

Target the correct integration branch.

For Darts work, normally target:

```text
project/darts-live-camera-support
```

---

## 20. Completion report format

At the end of every implementation session, report:

```text
Status:
Branch:
Commit:
Scope completed:
Files changed:
Validation executed:
Build result:
Manual checks:
Known limitations:
Deferred items:
Recommended next sprint:
```

Be precise. Distinguish executed checks from recommended checks.

---

## 21. Agent collaboration rules

GitHub is the source of truth.

When Verdent or another local agent is actively editing a feature branch, other agents should avoid changing the same files on the same branch in parallel.

Recommended division:

- Verdent: implementation, refactoring, local build, tests, commits;
- ChatGPT: product direction, scope, issue design, architecture review, GitHub review;
- user: product decisions, visual acceptance, pilot feedback, merge approval.

Before parallel work, divide work by branch or non-overlapping files.

Never assume another agent's unpushed local changes are visible in GitHub.

---

## 22. Security and secrets

Never commit:

- API keys;
- access tokens;
- passwords;
- private certificates;
- personal data;
- production credentials;
- `.env` files containing secrets.

Use documented environment-variable names and `.env.example` where configuration is required.

Treat camera images and future match/user data as potentially sensitive. Do not introduce storage or external transmission without an explicit data-handling decision.

---

## 23. Stop conditions

Stop and ask for clarification when:

- the active branch is unclear;
- the requested base branch does not exist;
- the working tree contains unexplained changes;
- instructions conflict materially;
- required credentials are missing;
- the task requires a destructive Git operation;
- product scope would materially expand;
- game rules would change;
- the build fails for a cause outside the active sprint;
- user or production data could be affected.

Do not guess through these conditions.

---

## 24. Definition of done

A sprint is complete only when:

- the requested scope is implemented;
- unrelated behaviour is preserved;
- required validation has passed;
- documentation is updated where needed;
- the branch is clean after commit;
- the completion report is provided;
- known limitations and next steps are explicit.

A visually improved screen without a successful build is not done.

A successful build without required functional verification is not fully done.
