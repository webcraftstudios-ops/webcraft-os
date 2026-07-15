# Spike04 Validation Evidence

## Phase status

```text
status: partially_validated
decision_status: formally_closed
decision: continue_with_constraints
```

Formal closure is a governance decision based on the recorded evidence and limitations. It does not add unobserved results.

## Canonical run statuses

```text
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

## Confirmed findings

Executed evidence supports these findings:

- broad descriptions often require specification refinement;
- photos, markings, measurements and part numbers materially affect search quality;
- specialist and reference routes can be useful without producing a product lead;
- category-based prompts can reduce early ambiguity;
- manual sourcing remains time-intensive;
- the evidence does not justify automation.

## Run 003 and Run 004 treatment

Detailed Run 003 and Run 004 artifacts remain only at the fixed historical revision. Conflicting child-document completion labels are not accepted as executed evidence because each canonical parent run document states `prepared_not_started`.

Historical sources:

- `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike04-manual-source-check/06-results/run-003-R003_BODY_MUSTANG_BUMPER_RIGHT.md`
- `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike04-manual-source-check/06-results/run-004-R004_CODE_0261S01070.md`

## Evidence included in metrics

Only:

- Spike03 technical tests;
- `RUN-001`;
- `RUN-002`.

See [../metrics.md](../metrics.md).

## Evidence sources

- Run 001: `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike04-manual-source-check/06-results/run-001-7Xo88NP.md`
- Run 002: `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike04-manual-source-check/07-decision/run-002-decision-note.md`
- Historical open phase decision: `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike04-manual-source-check/07-decision/go-no-go.md`
- Formal closure authority: Issue #57.