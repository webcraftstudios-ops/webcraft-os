# While Waiting Workplan — Specialist Validation Sprint

## Status

```text
status: active_waiting_for_response
flow_id: 7Xo88NP
primary_target: Alfaholics
secondary_target: Nardi-Personal
```

## Synthese

Beide specialistvragen zijn verzonden. Er wordt nu niet verder actief gezocht naar productleads. De nuttige werkruimte zit in voorbereiding: antwoordverwerking, intakebeslissing en Run 002-criteria.

## Scopebewaking

Binnen deze wachtfase doen we wel:

- response-triage voorbereiden;
- beslisboom klaarzetten;
- intake-delta aanscherpen;
- Run 002-selectiecriteria voorbereiden;
- documenteren wat we leren uit Run 001.

Binnen deze wachtfase doen we niet:

- extra specialisten mailen;
- follow-up sturen vóór 3 werkdagen;
- betaling of aankoop;
- nieuwe webshopfunctionaliteit;
- scraping of automatisering;
- klantbelofte.

## Werkblok 1 — Response triage

Maak bij ieder antwoord één van deze labels:

```text
confirmed_fitment
confirmed_nardi_specs
product_or_partnumber_suggested
needs_more_vehicle_info
needs_more_part_info
cannot_help
no_response_yet
```

## Werkblok 2 — Intakebeslissing voorbereiden

Als specialisten extra informatie vragen, bepaal welke velden minimaal nodig zijn voor Run 002:

```text
part_number_or_photo
variant_details
original_repro_used
compatibility_uncertain
hub_boss_adaptor_known
steering_wheel_diameter
bolt_pattern_or_pcd_known
```

## Werkblok 3 — Run 002-criteria

Run 002 mag pas starten als één van deze voorwaarden klopt:

```text
A. specialist bevestigt specs voor 7Xo88NP
B. er is een nieuwe case met foto/partnummer/variant
C. intake is licht aangescherpt met extra detailblok
```

## Beslisboom

```text
if Alfaholics confirms STE1030 or equivalent:
    run refined search with confirmed fitment
elif Nardi confirms wheel/hub/adaptor specs:
    run refined search with confirmed Nardi terms
elif either specialist asks for more info:
    improve intake before Run 002
elif no response after 3 business days:
    send one follow-up
elif no response after follow-up:
    run Run 002 only with a better-specified case
```

## Eerstvolgende concrete actie

Wachten op antwoord.

Tussentijds alleen voorbereiden:

```text
08-specialist-validation/response-triage.md
08-specialist-validation/run-002-selection-criteria.md
```
