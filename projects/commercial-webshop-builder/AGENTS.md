# Classic Parts Finder — Project Rules

## Scope

These rules apply only to `projects/commercial-webshop-builder/`.

`main` is the canonical target branch for this project dossier. Historical pull requests remain evidence sources and must not be changed by canonicalization work.

## Product boundary

Classic Parts Finder is currently a productized sourcing service for difficult-to-find classic-car parts.

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
  decision_status: not_closed
  direction: improve_intake + continue_manual_tests

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

## Evidence rules

Every material historical conclusion must identify a fixed source path and immutable revision:

- `main@905e0360256f0120bf7374333e6e79831e01e5c1`
- `PR1@4df73c7ffd0906b652809c70311ae83cb92773b3`
- `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9`
- `PR29@5e68d39ddf5943f7263a799bd5ac0b86e6ef3986`

A branch name is never sufficient as the only evidence reference.

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
4. Preserve the approved statuses and evidence references.
5. Validate links, privacy, file count, and status terminology.
6. Do not merge without projectmanager approval.

## Current action

There is exactly one current action. It is defined in [NEXT-STEP.md](NEXT-STEP.md).
