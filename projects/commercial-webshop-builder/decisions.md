# Decisions

## Decision 001 — Validate before building

**Decision:** Do not build a full webshop before a commercial hypothesis and validation process exist.

**Effect:** Spike01, Spike03 and Spike04 are evidence phases rather than production phases.

**Evidence:** `main@905e0360256f0120bf7374333e6e79831e01e5c1:projects/commercial-webshop-builder/experiments/oldtimer-onderdeel-gezocht-spike-01.md`

## Decision 002 — Spike03 technically validated

```text
status: technically_validated
decision: go_source_check
```

The multi-step intake and `case_view` status logic are sufficient for manual sourcing validation. This decision does not prove sourcing value, payment demand or production readiness.

**Evidence:**

- `PR1@4df73c7ffd0906b652809c70311ae83cb92773b3:spikes/spike03-intake-caseview/01-scope/spike03-scope.md`
- `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike03-intake-caseview/06-decision/go-no-go.md`
- `PR29@5e68d39ddf5943f7263a799bd5ac0b86e6ef3986:projects/commercial-webshop-builder/validation-log.md`

## Decision 003 — Keep Spike04 open

```text
status: partially_validated
decision_status: not_closed
direction: improve_intake + continue_manual_tests
```

Run 001 and Run 002 produced useful sourcing-process and intake findings. They did not produce sufficient quantified evidence for automation or a final commercial go-decision.

**Evidence:**

- `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike04-manual-source-check/06-results/run-001-7Xo88NP.md`
- `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike04-manual-source-check/07-decision/run-002-decision-note.md`
- `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike04-manual-source-check/07-decision/go-no-go.md`

## Decision 004 — Exclude Run 003 and Run 004 from executed metrics

Both runs are canonically classified as `prepared_not_started`. Their detailed preparation remains historical evidence but is not treated as executed validation.

**Evidence:**

- `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike04-manual-source-check/06-results/run-003-R003_BODY_MUSTANG_BUMPER_RIGHT.md`
- `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike04-manual-source-check/06-results/run-004-R004_CODE_0261S01070.md`

## Decision 005 — Canonicalize minimal project memory on main

The canonical dossier contains exactly 23 project files. Historical pull requests remain immutable evidence sources instead of being copied in full.

**Governance:**

- build permission: no;
- automation permission: no;
- payment permission: no;
- merge requires projectmanager review.

**Tracking:** Issue #54.

## Decision 006 — Treat €19 and €46 as unvalidated pilot hypotheses

The figures **€19** and **€46** are pilot pricing hypotheses only. They are not validated prices, publicly authorized prices or permission to make an offer.

```text
payment_validation: not_started
public_price_authorization: no
payment_permission: no
```

No payment request, checkout, Mollie, Stripe or other payment implementation is authorized.

## Decision 007 — One new case does not close Spike04

The next action remains exactly one privacy-safe manual validation case with a maximum of 60 minutes of active sourcing.

Completing that case does not automatically close Spike04. After active time, outcome, lead quality and specification enrichment are registered, the projectmanager must make a new decision about Spike04.

## Decision 008 — Preserve source hierarchy

CCP Finder Operations Manual v1.0 is a supporting operational source for executing and interpreting the manual process. It does not replace repository governance or the canonical project status.

After PR #55 is merged, GitHub `main` contains the canonical project status. Until then, this draft branch remains a proposed canonical dossier and merge is not authorized.
