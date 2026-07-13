# Case View Status Logic v0 — Run 002 Prototype

## Doel

Bepalen hoe nieuwe intakevelden manueel of later in `case_view` kunnen worden vertaald naar status en next_action.

## Nieuwe kandidaatvelden

```text
onderdeel_categorie
category_specific_details
category_detail_quality
compatibility_uncertain
photo_or_partnumber_available
sourcing_route_hint
specifier_notes
```

## Detailkwaliteit

`category_detail_quality` wordt manueel beoordeeld voor Run 002:

```text
none        = geen categorie-specifieke details
weak        = vage details, weinig bruikbaar
usable      = bruikbaar voor eerste search
strong      = foto/partnummer/maat/zijde/variant aanwezig
```

## Statuslogica

```text
if merk/model/bouwjaar/onderdeel_omschrijving missing:
    status = needs_info
    next_action = complete_missing_core_fields

elif onderdeel_categorie = unknown_other:
    status = needs_manual_classification
    next_action = classify_part_category

elif category_detail_quality = none and category is sensitive:
    status = needs_category_specific_info
    next_action = ask_category_specific_followup

elif compatibility_uncertain in [yes, unknown] and category is technical/safety/fitment-sensitive:
    status = needs_specialist_validation
    next_action = prepare_specialist_or_community_question

elif photo_or_partnumber_available = yes:
    status = ready_for_source_check
    next_action = start_source_check

elif category_detail_quality in [usable, strong]:
    status = ready_for_refinement_check
    next_action = build_category_specific_search_terms

else:
    status = ready_for_refinement_check
    next_action = manual_refinement_needed
```

## Sensitieve categorieën

Categorieën waarbij ontbrekende details sneller naar specialist/refinement moeten:

```text
steering_controls
lighting_electrical
engine_fuel
brakes_suspension
transmission_drivetrain
```

Categorieën waarbij marketplace/refinement vaak sneller mogelijk is:

```text
interior_trim_upholstery
body_exterior
rubber_seals
chrome_trim
instruments_dashboard
```

Let op: ook deze kunnen specialistisch worden wanneer compatibiliteit onzeker is.

## Sourcing route hint

```text
if category = steering_controls and compatibility_uncertain = yes:
    sourcing_route_hint = specialist_first

if category = interior_trim_upholstery and photo_available = yes:
    sourcing_route_hint = marketplace_plus_specialist

if category = body_exterior and side/body_style missing:
    sourcing_route_hint = ask_more_info

if category = engine_fuel and engine_code missing:
    sourcing_route_hint = specialist_first

if category = lighting_electrical and brand_or_partnumber available:
    sourcing_route_hint = marketplace_refined
```

## Output in case_view

Voor Run 002 volstaat een manuele kolomset:

```text
category_code
category_detail_quality
compatibility_flag
sourcing_route_hint
specifier_notes
status
next_action
```

## Meetpunt

Vergelijk Run 002 met Run 001:

```text
run_001_missing_info_count
run_002_missing_info_count
run_001_time_to_first_strategy
run_002_time_to_first_strategy
run_001_best_lead_score
run_002_best_lead_score
```
