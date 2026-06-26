# Run 004 — Channel 3 Vehicle Fitment Check

## Status

```text
status: done
flow_id: R004_CODE_0261S01070
case: Onderdeelcode 0261S01070
channel: channel_3_vehicle_fitment_check
scope: Spike04 only
```

## Zoekdoel

Controleren of de code en broncategorie voldoende zijn om voertuigfitment te bepalen, of dat extra intakevelden verplicht zijn.

## Input uit channel 1 en 2

```text
part_number_or_code: 0261S01070
code_match_found_indexed_web: no
source_category_detected: Dispositifs / interrupteurs / système électronique
subcategory_hint_internal: electrical_electronics
vehicle_known: no
photo_or_label_available: unknown
```

## Bevindingen

| Check | Resultaat | Lead score | Actie |
|---|---|---:|---|
| Vehicle make | ontbreekt | 1 | Verplicht opvragen na code-search. |
| Vehicle model | ontbreekt | 1 | Verplicht opvragen na code-search. |
| Bouwjaar/periode | ontbreekt | 1 | Verplicht opvragen na code-search. |
| Code source | onbekend | 1 | Vraag waar de code vandaan komt: label, sticker, website, factuur, OE-catalogus. |
| Foto van label/onderdeel | ontbreekt | 1 | Sterk aanbevolen maken voor code-first cases. |
| Fitment | niet bepaalbaar | 1 | Niet verder sourcen zonder voertuigdata of bronlink. |

## Analyse

Run 004 bewijst niet dat code-first meteen een productlead oplevert.

Run 004 bewijst wel dat code-first een nuttige intake-route is wanneer:

```text
een code beschikbaar is
een broncategorie zichtbaar is
vrije tekst ontbreekt of te zwak is
```

Maar voor fitment is de code alleen onvoldoende.

## Benodigde follow-upvraag

Voor part-number-first cases moet de intake na code-search vragen:

```text
Bij welk voertuig hoort deze code? Vul merk, model, bouwjaar en uitvoering in. Voeg indien mogelijk een foto toe van het label/sticker/onderdeel waarop de code staat, of de link naar de bronpagina waar je de code vond.
```

## Beslissing na channel 3

```text
channel_3_result: vehicle_fitment_missing
vehicle_fitment_found: no
vehicle_fitment_missing_info: make, model, year, version, code_source, photo_or_source_url
lead_score_best: 3
hard_product_lead_found: no
source_lead_found: yes_category_route
recommended_next_action: update intake prototype with part_number_or_code and code-source helper
```

## Stopreden

```text
Stop actieve Run 004 sourcing.
Geen extra websearch zonder voertuigdata.
Geen specialistmail.
Geen aankoop.
Geen klantbelofte.
```
