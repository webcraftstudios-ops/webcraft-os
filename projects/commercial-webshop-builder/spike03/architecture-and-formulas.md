# Spike03 Architecture and Formula Semantics

## Canonical flow

```text
contact
-> vehicle
-> requested part
-> consent
-> raw response tabs
-> normalized object tabs
-> case_view
```

## Intake key

The first form's submission identifier becomes the initial flow key. Downstream steps receive that same key.

Only the flow key travels between intake steps. Object identifiers are derived in the data layer rather than exposed as separate URL parameters.

## Data layers

### Raw layer

- raw persons;
- raw vehicles;
- raw requests;
- raw consents.

The raw layer preserves submitted values and the flow key.

### Normalized layer

Each object receives an identifier deterministically derived from the flow key:

```text
person_id  = derive(flow_id, "person")
vehicle_id = derive(flow_id, "vehicle")
request_id = derive(flow_id, "request")
consent_id = derive(flow_id, "consent")
```

The exact historical formulas remain at the fixed evidence revision. This canonical document preserves their operational meaning rather than copying overlapping formula variants.

### Case view

`case_view` uses the flow key to join the normalized objects into one operational row.

Conceptual completeness logic:

```text
case_complete =
  required_person_fields_present
  and required_vehicle_fields_present
  and required_request_fields_present
  and valid_consent_present
```

Conceptual status logic:

```text
if not case_complete:
    status = needs_info
    next_action = complete_missing_steps
else:
    status = ready_for_source_check
    next_action = start_source_check
```

`missing_fields` lists absent required groups or fields. A technically complete request can still require content refinement during Spike04.

## Data-quality safeguards

- one case row per flow key;
- no joining by row position;
- no silent acceptance of a missing flow key;
- duplicate and historical test rows must be filtered or flagged;
- completeness must not imply sourcing quality;
- invalid-looking contact input should be flagged without storing it in canonical evidence.

## Canonical evidence

- Form and redirect design: `PR1@4df73c7ffd0906b652809c70311ae83cb92773b3:spikes/spike03-intake-caseview/02-forms/tally-redirect-checklist.md`
- Sheet structure: `PR1@4df73c7ffd0906b652809c70311ae83cb92773b3:spikes/spike03-intake-caseview/03-google-sheets/sheet-structure.md`
- Operational formulas: `PR1@4df73c7ffd0906b652809c70311ae83cb92773b3:spikes/spike03-intake-caseview/03-google-sheets/case-view-formulas-current-sheet.md`
- Data-quality checks: `PR1@4df73c7ffd0906b652809c70311ae83cb92773b3:spikes/spike03-intake-caseview/03-google-sheets/data-quality-checks.md`
