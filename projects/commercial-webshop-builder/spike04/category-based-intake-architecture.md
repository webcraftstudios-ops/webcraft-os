# Category-Based Intake Architecture

## Status

```text
status: proposed_from_validation
implemented_in_production: no
```

## Design principle

Use:

```text
common core fields
+ category selector
+ category-specific detail prompt
```

Do not use one large technical form that asks irrelevant questions for every part type.

## Common core

- vehicle make;
- model;
- year or period;
- body style or version when relevant;
- part description;
- part category;
- photo, marking or part number when available;
- original, reproduction, used or new preference;
- fitment uncertainty;
- additional context.

## Initial categories

- steering and controls;
- interior and upholstery;
- body and exterior;
- lighting and electrical;
- engine and fuel;
- brakes and suspension;
- transmission and drivetrain;
- rubber and seals;
- chrome and trim;
- instruments and dashboard;
- other or unknown.

## Example category prompts

### Steering and controls

Ask about brand, model, diameter, hub or adaptor, mounting pattern and related controls.

### Body and exterior

Ask about side, position, full part versus repair section, body style, finish, brackets, condition and shipping sensitivity.

### Lighting and electrical

Ask whether the request concerns a lens, housing, reflector or complete unit; also ask side, voltage, lamp type, market context, brand and markings.

### Engine and fuel

Ask about engine code, displacement, fuel system, complete unit versus repair kit and related parts.

### Other or unknown

Ask where the part is located, what it does, what is missing or damaged, and request a photo or marking where possible.

## Proposed routing semantics

```text
missing core information
-> needs_info

unknown category
-> needs_manual_classification

critical category detail missing
-> needs_category_specific_info

fitment uncertainty on a sensitive part
-> needs_specialist_validation

sufficient identifying evidence
-> ready_for_source_check

otherwise
-> ready_for_refinement_check
```

## Validation meaning

Run 002 showed that category-specific prompting improved diagnosis and initial route selection. It did not validate a production form implementation.

## Evidence

- Architecture proposal: `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike04-manual-source-check/08-specialist-validation/category-based-intake-architecture.md`
- Intake delta: `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike04-manual-source-check/08-specialist-validation/intake-field-delta.md`
- Prototype form: `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike04-manual-source-check/09-run-002-intake-prototype/intake-form-v0.md`
- Status logic: `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike04-manual-source-check/09-run-002-intake-prototype/case-view-status-logic-v0.md`
