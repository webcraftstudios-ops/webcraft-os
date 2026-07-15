# Classic Parts Finder — Project Rules

## Scope

These rules apply only to `projects/commercial-webshop-builder/`.

## Canonical branch and workflow

```text
project_status: continue_with_constraints
active_phase: canonicalization_and_formal_closure_of_spike04
canonical_branch: main
future_canonical_branch_count: 1
build_permission: no
automation_permission: no
```

`main` is the only future canonical branch for this project dossier. `main_n8n`, historical branches and open pull requests remain evidence sources only and are not integration targets.

Verdent is not used in the current workflow. GitHub issues, pull requests and `main` are the project control plane and source of truth.

## Product boundary

Classic Parts Finder is a productized sourcing service for difficult-to-find classic-car parts.

Not authorized:

- application development;
- sourcing execution during documentation work;
- automation or scraping;
- payment or checkout;
- storefront or marketplace work;
- changes outside this project directory.

## Canonical statuses

```text
Spike03:
  status: technically_validated
  decision: go_source_check

Spike04:
  status: partially_validated
  decision_status: formally_closed
  decision: continue_with_constraints
  direction: improve_intake_before_next_commercial_test

Run 001:
  status: executed

Run 002:
  status: partially_executed_and_closed

Run 003:
  status: prepared_not_started
  included_in_executed_metrics: no

Run 004:
  status: prepared_not_started
  included_in_executed_metrics: no
```

Formal closure of Spike04 is a governance decision. It does not convert missing profitability, willingness-to-pay or repeatability evidence into validated results.

## Evidence rules

Every material historical conclusion must identify a fixed source path and immutable revision:

- `main@905e0360256f0120bf7374333e6e79831e01e5c1`
- `PR1@4df73c7ffd0906b652809c70311ae83cb92773b3`
- `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9`
- `PR29@5e68d39ddf5943f7263a799bd5ac0b86e6ef3986`

A branch name is never sufficient as the only evidence reference. Current governance decisions may additionally reference Issue #57.

## Privacy rules

Do not include private contact information, private form or spreadsheet links, form-administration links, specialist contact logs, unnecessary tracking data, authentication material, or material with unknown provenance.

Use these safe case labels:

- `TEST-INCOMPLETE-01`
- `TEST-COMPLETE-01`
- `TEST-COMPLETE-02`
- `RUN-001`
- `RUN-002`

Only aggregated operational metrics belong in central status files.

## Working protocol

1. Read [README.md](README.md), [current-status.md](current-status.md), and [NEXT-STEP.md](NEXT-STEP.md).
2. Declare scope and expected file changes before editing.
3. Keep changes inside this directory.
4. Preserve evidence-backed findings and explicitly mark superseded status decisions.
5. Validate links, privacy, file count and status terminology.
6. Do not merge without projectmanager approval.

## Current action

There is exactly one current action. It is defined in [NEXT-STEP.md](NEXT-STEP.md).